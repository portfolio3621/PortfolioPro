const User = require("../models/userModel");
const Bill = require("../models/BillModel");
const Portfolio = require("../models/portfolioModel");
const sendToken = require("../utils/jwt");
const { Message } = require("../utils/message");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Example standardized error handler
const handleError = (res, err, context) => {
  console.error(`${context} error:`, err);
  return Message(res, 500, false, "Internal server error");
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return Message(
        res,
        400,
        false,
        "Please provide name, email, and password"
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Message(res, 400, false, "User already exists with this email");
    }

    const userData = await User.create(req.body);

    // Remove password from the response
    userData.password = undefined;

    sendToken(res, userData);

    return Message(res, 201, true, "User registered successfully", userData);
  } catch (err) {
    console.error("Registration error:", err);
    Message(res, 500, false, "Internal server error");
  }
};

exports.socialLinksRegister = async (req, res) => {
  try {
    const { socialLinks } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false });

    user.socialLinks = new Map(Object.entries(socialLinks));
    await user.save();

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

exports.dashboardData = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const bills = await Bill.find({ userId });

    const data = await Promise.all(
      bills.map(async (bill) => {
        const portfolio = await Portfolio.findById(bill.portfolioId);

        if (!portfolio) return null;

        return {
          id: bill._id,
          name: portfolio.title,
          path: `/portfolio/public/${bill._id}`,
          thumbnail: portfolio.thumbnail,
          category: portfolio.category,
          price: portfolio.price,
        };
      })
    );

    // remove null values if portfolio not found
    const filteredData = data.filter(Boolean);

    Message(res, 200, true, "Dashboard data fetched", filteredData);
  } catch (err) {
    console.error("Dashboard error:", err);
    Message(res, 500, false, "Internal server error");
  }
};

exports.dashboardSingleBillData = async (req, res) => {
  try {
    const billId = req.params.id
    const userId = req.user.id || req.user._id;

    const bills = await Bill.find({ userId });

    const data = await Promise.all(
      bills.map(async (bill) => {
        const portfolio = await Portfolio.findById(bill.portfolioId);

        if (!portfolio) return null;

        return {
          id: bill._id,
          name: portfolio.title,
          thumbnail: portfolio.thumbnail,
          category: portfolio.category,
          price: portfolio.price,
          status:bill.status,
          token:bill?.token ?? null,
          createdAt:bill.createdAt
        };
      })
    );

    // remove null values if portfolio not found
    const filteredData = data.filter(val => val.id == billId);

    Message(res, 200, true, "Requested bill data fetched", filteredData);
  } catch (err) {
    console.error("Dashboard error:", err);
    Message(res, 500, false, "Internal server error");
  }
};

exports.updateData = async (req, res) => {
  try {
    const id = req.user.id;
    const updateData = req.body;

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return Message(res, 404, false, "User not found");
    }

    // Prevent email updates if email is in the update data
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await User.findOne({ email: updateData.email });
      if (emailExists) {
        return Message(
          res,
          400,
          false,
          "Email already in use by another account"
        );
      }
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Remove sensitive data before sending response
    updatedUser.password = undefined;

    return Message(res, 200, true, "User updated successfully", updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    Message(res, 500, false, "Internal server error");
  }
};

exports.getAllData = async (req, res) => {
  try {
    const allData = await User.find({});
    Message(res, 200, true, "", allData);
  } catch (err) {
    Message(res, 400, err.message);
  }
};

exports.getSingleData = async (req, res) => {
  try {
    const data = req.user;
    Message(res, 200, true, "", data);
  } catch (err) {
    Message(res, 400, err.message);
  }
};

exports.getSingleDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    Message(res, 200, true, "", data);
  } catch (err) {
    Message(res, 400, err.message);
  }
};

exports.deleteSingleData = async (req, res) => {
  try {
    const id = req.user.id;
    const userVerify = await User.findById(id);
    if (!userVerify) {
      return Message(res, 400, "User data is not found");
    }

    await User.findByIdAndDelete(id);

    Message(res, 200, "User data is successfully deleted");
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password } = req.body;

    if (!password) {
      return Message(res, 400, false, "Please provide password");
    }

    const user = await User.findById(id).select("+password");

    if (!user || !(await user.isValidPassword(password))) {
      return Message(res, 401, false, "Wrong Password,Check it");
    }

    user.password = undefined;

    Message(res, 200, true, "Password is Correct");
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return Message(res, 400, false, "Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isValidPassword(password))) {
      return Message(res, 401, false, "Wrong Password,Check it");
    }

    // Remove password from response
    user.password = undefined;

    // Send welcome email (non-blocking)
    try {
      const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Back!</title>
    <style>
      @media screen and (max-width: 600px) {
        .main-table {
          width: 100% !important;
        }
        .content {
          padding: 20px !important;
        }
        .btn {
          padding: 12px 20px !important;
          font-size: 16px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
      <tr>
        <td align="center" style="padding: 40px 10px;">
          <table class="main-table" cellpadding="0" cellspacing="0" width="600" style="width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
            <tr>
              <td align="center" style="background-color: #4f46e5; padding: 40px 20px;">
                <h1 style="margin: 0; font-size: 28px; font-family: Arial, sans-serif; color: #ffffff;">Welcome Back!</h1>
                <p style="color: #e0e0ff; font-size: 16px; margin: 10px 0 0;">You're now logged in successfully.</p>
              </td>
            </tr>
            <tr>
              <td class="content" style="padding: 30px; font-family: Arial, sans-serif; color: #333333;">
                <h2 style="margin-top: 0;">Hi ${user.name},</h2>
                <p style="font-size: 16px; line-height: 24px;">
                  We're glad to see you back! Explore your dashboard and take advantage of all the new updates and features we’ve added.
                </p>
                <p style="text-align: center;">
                  <a href="${process.env.FRONTEND_URL}/dashboard" class="btn" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 18px;">
                    Go to Dashboard
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; font-size: 12px; color: #999999; font-family: Arial, sans-serif;">
                You received this email because you just logged in to your account.<br />
                &copy; 2025 Portfolio. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
      sendEmail({
        email,
        subject: "Welcome Back",
        html,
      }).catch((emailError) => {
        console.error("Email sending failed:", emailError);
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    sendToken(res, user);

    return Message(res, 200, true, "Login successful", {
      user,
    });
  } catch (err) {
    return handleError(res, err, "Login");
  }
};

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    Message(res, 200, true, "Loggedout");
  } catch (err) {
    return handleError(res, err, "Logout");
  }
};

exports.addExperience = async (req, res) => {
  try {
    const { role, company, period, description, achievements } = req.body;
    const id = req.user.id;

    if (!role || !company || !period || !description || !achievements) {
      return Message(
        res,
        400,
        false,
        "Experience role, company, period, description, and achievements are required"
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return Message(res, 400, false, "User not found");
    }

    user.experience.push({
      role,
      company,
      period,
      description,
      achievements,
    });

    await user.save();

    return Message(res, 200, true, "Experience added successfully");
  } catch (err) {
    return Message(res, 400, false, err.message);
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const id = req.user.id;
    const { index } = req.params; // `index` = position in experience array
    const { role, company, period, description, achievements } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return Message(res, 404, false, "User not found");
    }

    if (!user.experience || index < 0 || index >= user.experience.length) {
      return Message(res, 404, false, "Experience not found");
    }

    // Update the fields
    const experience = user.experience[index];
    if (role) experience.role = role;
    if (company) experience.company = company;
    if (period) experience.period = period;
    if (description) experience.description = description;
    if (achievements) experience.achievements = achievements;

    await user.save();

    return Message(res, 200, true, "Experience updated successfully");
  } catch (err) {
    return Message(res, 400, false, err.message);
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { index } = req.params;
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return Message(res, 404, false, "User not found");
    }

    if (!user.experience || index < 0 || index >= user.experience.length) {
      return Message(res, 404, false, "Experience not found");
    }

    user.experience.splice(index, 1); // remove item at index
    await user.save();

    return Message(res, 200, true, "Experience deleted successfully");
  } catch (err) {
    return Message(res, 400, false, err.message);
  }
};

exports.addEducation = async (req, res) => {
  try {
    const { degree, institution, year, courses } = req.body;
    const id = req.user.id;

    if (!degree || !institution || !year || !Array.isArray(courses)) {
      return Message(
        res,
        400,
        false,
        "All fields are required, and courses must be an array."
      );
    }

    const user = await User.findById(id);
    if (!user) return Message(res, 404, false, "User not found");

    user.education.push({ degree, institution, year, courses });
    await user.save();

    return Message(res, 200, true, "Education added successfully");
  } catch (err) {
    return Message(res, 400, false, err.message);
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const { index } = req.params;
    const id = req.user.id;
    const { degree, institution, year, courses } = req.body;

    const user = await User.findById(id);
    if (!user) return Message(res, 404, false, "User not found");

    if (!user.education || index < 0 || index >= user.education.length) {
      return Message(res, 404, false, "Education entry not found");
    }

    const education = user.education[index];
    if (degree) education.degree = degree;
    if (institution) education.institution = institution;
    if (year) education.year = year;
    if (Array.isArray(courses)) education.courses = courses;

    await user.save();
    return Message(res, 200, true, "Education updated successfully");
  } catch (err) {
    return Message(res, 400, false, err.message);
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { index } = req.params;
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) return Message(res, 404, false, "User not found");

    if (!user.education || index < 0 || index >= user.education.length) {
      return Message(res, 404, false, "Education entry not found");
    }

    user.education.splice(index, 1);
    await user.save();

    return Message(res, 200, true, "Education deleted successfully");
  } catch (err) {
    Message(res, 400, false, err.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) {
      return Message(res, 400, false, "Old Password is Required");
    }
    if (!newPassword) {
      return Message(res, 400, false, "New Password is Required");
    }
    if (!(await user.isValidPassword(oldPassword))) {
      return Message(res, 401, false, "old password is incorrect");
    }

    user.password = newPassword;
    await user.save();
    Message(res, 200, true, "Password has been changed");
  } catch (err) {
    Message(res, 400, false, err.message, err);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return Message(res, 400, false, "User not found");
    }
    const resetToken = user.getResetToken();

    await user.save({ validateBeforeSave: false });

    const BASE_URL = process.env.FRONTEND_URL;

    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f4f4f7; border-radius: 10px;">
      <div style="background-color: #4f46e5; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
        <h1 style="margin: 0;">Portfolio Pro</h1>
        <p style="margin: 0; font-size: 16px;">Password Reset Request</p>
      </div>
      <div style="padding: 30px; background-color: white; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; color: #333;">
          Hello <strong>${user.name || user.email}</strong>,
        </p>
        <p style="font-size: 15px; color: #555;">
          You recently requested to reset your password for your Portfolio Pro account. Click the button below to reset it. This password reset is only valid for the next 30 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" target="_blank" style="padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reset Your Password
          </a>
        </div>
        <p style="font-size: 14px; color: #999;">
          If you did not request a password reset, please ignore this email or contact support if you have questions.
        </p>
        <p style="font-size: 14px; color: #999;">— Portfolio Pro Team</p>
      </div>
    </div>
  `;

    sendEmail({
      email: user.email,
      subject: "PORTFOLIO PRO PASSWORD RECOVERY",
      html,
    }).catch((emailError) => {
      console.error("Email sending failed:", emailError);
    });
    Message(res, 200, true, `Password had sent to ${user.email}`);
  } catch (err) {
    Message(res, 400, false, err.message, err);
  }
};

exports.getSingleDataForResetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
    });
    if (!user) {
      return Message(res, 401, false, "Password reset token is invalid");
    }
    Message(res, 200, true, "", user);
  } catch (err) {
    Message(res, 400, err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpire: {
        $gt: Date.now(),
      },
    }).select("+password");
    if (!user) {
      return Message(
        res,
        401,
        false,
        "Password reset token is invalid or expire"
      );
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    Message(res, 201, true, "Password has been changed");
  } catch (err) {
    Message(res, 400, false, err.message, err);
  }
};

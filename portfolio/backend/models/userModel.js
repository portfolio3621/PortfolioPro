const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Reusable sub-schemas
const projects = new mongoose.Schema(
  {
    title: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    imageUrl: String,
  },
  { _id: false }
);

const experiences = new mongoose.Schema(
  {
    role: String,
    company: String,
    period: String,
    description: [String],
    achievements: [String],
  },
  { _id: false }
);

const educations = new mongoose.Schema(
  {
    degree: String,
    institution: String,
    year: String,
    courses: [String],
  },
  { _id: false }
);

// Main User Schema
const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      select: false,
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Please select a valid gender",
      },
    },
    phone: String,
    avatarUrl: {
      type: String,
      default: "./public/user.png",
    },
    resumeUrl: String,
    address: String,
    about: String,

    skills: [
      {
        _id: false,
        name: String,
        level: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],

    project: [projects],
    experience: [experiences],
    education: [educations],


    socialLinks: {
      type: Map,
      of: String,
      default: () => new Map(),
    },

    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,

    online: {
      type: Boolean,
      default: false,
    },
  },
  { 
    versionKey: false,
    timestamps: true   // Optional: adds createdAt & updatedAt
  }
);

// Password hashing middleware
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Methods
userModel.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

userModel.methods.isValidPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return token;
};

// Export model
const User = mongoose.model("User", userModel);
module.exports = User;
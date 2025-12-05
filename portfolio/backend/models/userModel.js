const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    email: {
      type: String,
      unique: true,
      require: [true, "email is required"],
    },
    password: {
      type: String,
      select: false,
      minlength: [6, "Only 6 character Accept"],
      maxlength: [6, "Only 6 character Accept"],
      require: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Please select correct category",
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
          minlength: 0,
          maxlength: 100,
        },
      },
    ],
    project: [projects],
    experience: [experiences],
    education: [educations],
    portfolio: [String],
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    online:Boolean,
  },
  { versionKey: false }
);

userModel.pre("save", async function (next) {
  // Check if the password has been modified, if not, skip hashing
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userModel.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userModel.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
  return token;
};

const user = mongoose.model("user", userModel);
module.exports = user;

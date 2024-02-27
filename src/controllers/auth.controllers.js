const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middleware/asyncWrapper.js");
const User = require("../models/user.model.js");
const generateJWT = require("../utils/generateJWT.js");
const { FAIL } = require("../utils/httpStatusText.js");
const AppError = require("../utils/appError.js");

const registerPage = asyncWrapper(async (req, res) => {
  res.render("pages/register.ejs");
});

const registerUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;

  // validation
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, FAIL);
    return next(error);
  }
  // check if user exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = AppError.create("User already exists", 400, FAIL);
    console.log(error);
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = await generateJWT({
    email: user.email,
    id: user._id,
  });

  user.tokens = token;

  await user.save();

  res.redirect("/");
});

const loginPage = asyncWrapper(async (req, res) => {
  res.render("pages/login.ejs");
});

const loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, req.body);
  // validation
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    const error = AppError.create(errors.array(), 400, FAIL);
    return next(error);
  }

  const user = await User.findOne({ email });

  if (!user) {
    const error = AppError.create("user not found", 400, FAIL);
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = AppError.create("invalid credentials", 400, FAIL);
    return next(error);
  }

  const token = generateJWT({
    email: user.email,
    id: user._id,
  });

  res.redirect("/");
});

const logoutUser = asyncWrapper(async (req, res) => {
  res.render("pages/logout.ejs");
});

const resetPassword = asyncWrapper(async (req, res) => {
  res.render("pages/resetPassword.ejs");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  loginPage,
  registerPage,
};

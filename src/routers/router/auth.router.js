const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  loginPage,
  registerPage,
} = require("../../controllers/auth.controllers");
const bodyParser = require("body-parser");
const {
  registerValidation,
  loginValidation,
} = require("../../utils/validators/authValidator");

const router = express.Router();

// register page and register user
router.get("/register", registerPage);

router.post(
  "/register",
  registerValidation(),
  bodyParser.urlencoded({ extended: true }),
  registerUser
);

// login page and login user
router.get("/login", loginPage);

router.post(
  "/login",
  loginValidation(),
  bodyParser.urlencoded({ extended: true }),
  loginUser
);

// logout
router.get("/logout", logoutUser);

router.put("/resetPassword", resetPassword);

module.exports = router;

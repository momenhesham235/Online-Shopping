const { body } = require("express-validator");

const registerValidation = () => {
  return [
    body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 3 })
      .withMessage("username must be at least 3 characters long"),
    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
    body("confirmPassword")
      .exists()
      .withMessage("confirmPassword is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("confirmPassword does not match with password");
        }
      }),
    body("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be a valid email address"),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .exists()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email must be a valid email address"),
    body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
  ];
};

module.exports = { registerValidation, loginValidation };

const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    const error = appError.create(
      "unauthorized access",
      401,
      httpStatusText.ERROR
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const User = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = User;
    next();
  } catch (err) {
    const error = appError.create("invalid token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;

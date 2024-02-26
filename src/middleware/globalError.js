const { ERROR } = require("../utils/httpStatusText");

const globalError = (error, req, res, next) => {
  res.status(error.httpStatusCode || 500).render("pages/error.ejs", {
    error: {
      status: error.httpStatusCode || 500,
      message: error.message,
      text: ERROR,
    },
  });
};

module.exports = globalError;

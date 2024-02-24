const homeRouter = require("./router/home.router.js");
const userRouter = require("./router/user.router.js");

const mainRoutes = (app) => {
  app.use("/", homeRouter);
  app.use("/api/v1/users", userRouter);
};

module.exports = mainRoutes;

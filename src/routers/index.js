const homeRouter = require("./router/home.router.js");
const productsRouter = require("./router/products.router.js");
const notFound = require("./router/notFound.router.js");

const globalError = require("../middleware/globalError.js");

const mainRoutes = (app) => {
  app.use("/", homeRouter);
  app.use("/", productsRouter);
  // Route not found handler
  app.all("*", notFound);

  // Global Error handler
  app.use(globalError);
};

module.exports = mainRoutes;

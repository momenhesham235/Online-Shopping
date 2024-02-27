const asyncWrapper = require("../middleware/asyncWrapper");
const Product = require("../models/products.model");

const getHome = asyncWrapper(async (req, res) => {
  const reqQuery = { ...req.query };
  console.log(reqQuery);
  const products = await Product.find({ ...reqQuery });
  res.render("pages/home.ejs", { products });
});

module.exports = {
  getHome,
};

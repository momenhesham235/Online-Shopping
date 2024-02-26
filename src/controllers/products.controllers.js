const asyncWrapper = require("../middleware/asyncWrapper");
const Product = require("../models/products.model");

const getProductDetail = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  res.render("pages/productDetail.ejs", { product });
});

module.exports = {
  getProductDetail,
};

const express = require("express");
const router = express.Router();
const { getProductDetail } = require("../../controllers/products.controllers");

router.get("/product/:id", getProductDetail);

module.exports = router;

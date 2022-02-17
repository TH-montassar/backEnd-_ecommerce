const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/product.controllers");

const router = require("express").Router();

router.post("/", createProduct);
router.put("/:productId", updateProduct);
 router.get("/:productId", getProduct);
 router.get("/", getProducts);
 router.delete("/:productId",deleteProduct)

module.exports = router;

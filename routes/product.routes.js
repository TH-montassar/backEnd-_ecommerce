const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
  filterProduct,

} = require("../controllers/product.controllers");

const router = require("express").Router();
router.get('/s',filterProduct);
router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.get("/:productId", getProduct);

router.get("/", getProducts);
router.delete("/:productId", deleteProduct);


module.exports = router;

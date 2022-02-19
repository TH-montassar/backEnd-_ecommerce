const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
  filterProduct,
} = require("../controllers/product.controllers");



const router = require("express").Router();
const verifyToken =require("../middlewares/verifyToken")




router.get("/s",filterProduct);
router.post("/", verifyToken, createProduct);
router.put("/:productId", verifyToken, updateProduct);
router.get("/:productId", getProduct);

router.get("/", getProducts);
router.delete("/:productId", verifyToken, deleteProduct);

module.exports = router;

const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
  
} = require("../controllers/product.controllers");



const router = require("express").Router();
const verifyToken =require("../middlewares/verifyToken")





router.post("/", verifyToken, createProduct);
router.put("/:productId", verifyToken, updateProduct);
router.get("/:productSlug", getProduct);

router.get("/", verifyToken, getProducts);
router.delete("/:productId", verifyToken, deleteProduct);

module.exports = router;

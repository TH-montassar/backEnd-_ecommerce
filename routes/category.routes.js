const {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/category.controllers");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, createCategory);
router.put("/:categoryId", verifyToken, updateCategory);
router.get("/:categorySlug", verifyToken, getCategory);
router.get("/", verifyToken, getCategories);
router.delete("/:categoryId", deleteCategory);

module.exports = router;

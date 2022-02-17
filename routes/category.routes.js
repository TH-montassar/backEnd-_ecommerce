const { createCategory, updateCategory, getCategory, getCategories, deleteCategory } = require("../controllers/category.controllers");

const router =require("express").Router();

router.post("/",createCategory)
router.put("/:categoryId",updateCategory)
router.get("/:categoryId",getCategory)
router.get("/",getCategories)
router.delete("/:categoryId",deleteCategory)


module.exports=router
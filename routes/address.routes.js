const express = require("express");
const {
  createAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
router.post("/", verifyToken, createAddress);
router.get("/:addressId", verifyToken, getAddress);
router.get("/", verifyToken, getAddresses);
router.put("/:addressId", verifyToken, updateAddress);
router.delete("/:addressId", verifyToken, deleteAddress);

module.exports = router;

const express = require("express");
const {
  createAddress,
  getAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  meAddresses,
} = require("../controllers/address.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
router.get("/me", verifyToken,meAddresses);
router.post("/", verifyToken, createAddress);
router.get("/:addressId", verifyToken, getAddress);
router.get("/", verifyToken, getAddresses);
router.put("/:addressId", verifyToken, updateAddress);
router.delete("/:addressId", verifyToken, deleteAddress);
router.get("/me", verifyToken,meAddresses);

module.exports = router;

const {
  createOrder,
  getOrder,
  getOrders,
  getMyOrder,
  changeStatusOrder,
} = require("../controllers/order.controllers");
const IsAdmin = require("../middlewares/IsAdmin");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();
router.get("/me", verifyToken,getMyOrder);
router.post("/", verifyToken, createOrder);
router.get("/:orderId", verifyToken, getOrder);
router.get("/", verifyToken, getOrders);
router.put("/:orderId", verifyToken,IsAdmin,changeStatusOrder);



module.exports = router;

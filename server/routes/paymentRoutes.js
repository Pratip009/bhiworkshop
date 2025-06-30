const express = require("express");
const {
  verifyPayment,
  initiatePayment,
  getAllPayments,
} = require("../controllers/paymentController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", auth(), initiatePayment);
// 👇 Secure with auth middleware
router.post("/verify", auth(), verifyPayment);
router.get("/all", auth(["admin"]), getAllPayments);

module.exports = router;

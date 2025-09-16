const User = require("../models/User");
const Course = require("../models/Course");
const Purchase = require("../models/Purchase");
const axios = require("axios");

const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // 🔁 change to live in production

// ----------------------------
// Initiate PayPal Payment
// ----------------------------
exports.initiatePayment = async (req, res) => {
  try {
    const { amount, return_url, cancel_url } = req.body;

    if (!amount || !return_url) {
      return res.status(400).json({ message: "Missing amount or return URL" });
    }

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
          },
        ],
        application_context: {
          return_url,
          cancel_url: cancel_url || return_url,
        },
      },
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET,
        },
      }
    );

    const approval_url = response.data.links.find(
      (link) => link.rel === "approve"
    )?.href;

    const paymentId = response.data.id;

    console.log("✅ PayPal Payment Created:", paymentId, approval_url);

    if (!approval_url || !paymentId) {
      return res.status(500).json({ message: "Failed to create PayPal order" });
    }

    res.status(200).json({ approval_url, paymentId });
  } catch (error) {
    console.error("❌ PayPal initiate error:", error.response?.data || error);
    res.status(500).json({ message: "PayPal payment initiation failed" });
  }
};

// ----------------------------
// Verify & Capture Payment
// ----------------------------
exports.verifyPayment = async (req, res) => {
  const {
    userId,
    courseId,
    amount,
    paymentId: paypalOrderId,
    workshopDate,
    timeSlot,
  } = req.body;

  if (!userId || !courseId || !paypalOrderId) {
    return res
      .status(400)
      .json({ message: "Missing payment verification details" });
  }

  try {
    // 1️⃣ Capture payment from PayPal
    const captureRes = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET,
        },
      }
    );

    console.log("🔎 PayPal Capture Response:", captureRes.data);

    if (captureRes.data.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // 2️⃣ Validate course
    const course = await Course.findById(courseId);
    if (!course || parseInt(course.price) !== parseInt(amount)) {
      return res.status(400).json({ message: "Invalid course or amount" });
    }

    // 3️⃣ Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 4️⃣ Check already purchased
    const alreadyEnrolled = user.purchasedCourses.find(
      (entry) => entry.course.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    // 5️⃣ Save to user's purchasedCourses
    if (parseFloat(course.price) !== parseFloat(amount)) {
      return res.status(400).json({ message: "Invalid course or amount" });
    }

    await user.save();

    // 6️⃣ Save to Purchase collection
    const purchase = await Purchase.create({
      user: userId,
      course: courseId,
      amount,
      paymentId: paypalOrderId,
      status: "completed",
      workshopDate,
      timeSlot,
    });

    console.log("✅ Purchase saved:", purchase);

    res.status(200).json({
      message: "Payment verified and course enrolled successfully",
      purchase,
    });
  } catch (error) {
    console.error("❌ Payment verify error:", error.response?.data || error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

// ----------------------------
// Admin: Get All Payments
// ----------------------------
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Purchase.find()
      .populate("user", "username contact email")
      .populate("course", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("❌ Fetch payments error:", error.message);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

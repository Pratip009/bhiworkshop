const User = require("../models/User");
const Course = require("../models/Course");
const Purchase = require("../models/Purchase");
const axios = require("axios");

// ✅ Initiate PayPal Payment
exports.initiatePayment = async (req, res) => {
  try {
    const { amount, return_url } = req.body;

    if (!amount || !return_url) {
      return res.status(400).json({ message: "Missing amount or return URL" });
    }

    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
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
          cancel_url: return_url, // Optional: you can have a separate cancel URL
        },
      },
      {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_SECRET,
        },
      }
    );

    const approval_url = response.data.links.find(
      (link) => link.rel === "approve"
    )?.href;

    const paymentId = response.data.id;

    console.log("✅ PayPal Payment Created:");
    console.log("paymentId:", paymentId);
    console.log("approval_url:", approval_url);

    if (!approval_url || !paymentId) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve payment link" });
    }

    res.status(200).json({ approval_url, paymentId });
  } catch (error) {
    console.error("❌ PayPal payment creation failed:", error.message);
    res
      .status(500)
      .json({ message: "PayPal payment failed", error: error.message });
  }
};

// ✅ Verify Payment & Enroll User
exports.verifyPayment = async (req, res) => {
  const { userId, courseId, amount, paymentId } = req.body;

  if (!userId || !courseId || !amount || !paymentId) {
    return res
      .status(400)
      .json({ message: "Missing or invalid payment details." });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course || parseInt(course.price) !== parseInt(amount)) {
      return res.status(400).json({ message: "Invalid course or amount" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyEnrolled = user.purchasedCourses.find(
      (entry) => entry.course.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    // Save to user's courses
    user.purchasedCourses.push({
      course: courseId,
      purchasedAt: new Date(),
    });
    await user.save();

    // Save to Purchase table
    const purchase = await Purchase.create({
      user: userId,
      course: courseId,
      amount,
      paymentId,
      status: "completed",
    });

    console.log("✅ Purchase saved:", purchase);

    res.status(200).json({ message: "Payment verified and course added" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Purchase.find()
      .populate("user", "username contact") // fetch username & contact
      .populate("course", "title") // fetch course title
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

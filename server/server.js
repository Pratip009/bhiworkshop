require("dotenv").config();
const compression = require("compression");
const path = require("path");
const express = require("express");
const paypal = require("paypal-rest-sdk");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { auth } = require("./middleware/authMiddleware");
const courseRoutes = require("./routes/courseRoutes");
const blogRoutes = require("./routes/blogRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const workshopRoutes = require("./routes/workshopRoutes");

const app = express();

// ------------------- CORS SETUP -------------------
const allowedOrigins = [
  "http://localhost:5173",       // Local dev
  "https://bhiworkshops.com"     // Deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// ---------------------------------------------------

app.use(express.json()); // Enable JSON parsing
app.use(compression());

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// ------------------- MONGODB CONNECTION -------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    console.log(`📡 Connected to DB: ${process.env.MONGODB_URI}`);
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
});
// ----------------------------------------------------------

// ------------------- ROUTES -------------------
app.use("/auth", authRoutes);

app.use("/users", (req, res, next) => {
  next();
});
app.use("/users", auth(["admin"]), userRoutes);

app.use("/courses", courseRoutes);
app.use("/blogs", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/payment", paymentRoutes);
app.use("/contact", contactRoutes);
app.use("/workshops", workshopRoutes);
// ---------------------------------------------------

// ------------------- PAYPAL CONFIG -------------------
paypal.configure({
  mode: "sandbox", // Change to 'live' for production
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});
// ------------------------------------------------------

// Test blog post route
app.post("/api/blogs", (req, res) => {
  console.log("Incoming request body:", req.body);
  res.status(200).json({ message: "Received" });
});

// ------------------- PAYPAL PAYMENT ROUTES -------------------
app.post("/payment", auth(["user", "admin"]), async (req, res) => {
  try {
    const { amount } = req.body;

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `${BASE_URL}/success`,
        cancel_url: `${BASE_URL}/failed`,
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: amount.toFixed(2),
          },
          description: `Payment for course - $${amount}`,
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error("PayPal Error:", error);
        return res.status(500).json({ error: "Payment creation failed" });
      } else {
        const approvalUrl = payment.links.find(
          (link) => link.rel === "approval_url"
        );
        if (approvalUrl) {
          res.json({ approval_url: approvalUrl.href });
        } else {
          res.status(500).json({ error: "No approval URL found" });
        }
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/success", async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    if (!payerId || !paymentId) {
      return res.redirect(`${BASE_URL}/failed`);
    }

    paypal.payment.execute(
      paymentId,
      { payer_id: payerId },
      (error, payment) => {
        if (error) {
          console.error("Execution Error:", error);
          return res.redirect(`${BASE_URL}/failed`);
        } else {
          console.log("Payment Successful:", payment);
          return res.redirect(`${BASE_URL}/success`);
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.redirect(`${BASE_URL}/failed`);
  }
});

app.get("/failed", (req, res) => {
  return res.redirect(`${BASE_URL}/failed`);
});
// ------------------------------------------------------------

// ------------------- SERVE FRONTEND -------------------
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// Catch-all for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});
// ---------------------------------------------------------

// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// ---------------------------------------------------

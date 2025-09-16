require("dotenv").config();
const compression = require("compression");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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
  "http://localhost:5173", // Local dev
  "http://localhost:3000", // React dev
  "https://bhiworkshops.com",
  "https://www.bhiworkshops.com",
  "https://bhiworkshop-new.onrender.com", // Backend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming request origin:", origin);
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ---------------------------------------------------

app.use(express.json());
app.use(compression());

// ------------------- MONGODB CONNECTION -------------------
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log(`📡 Connected to DB: ${process.env.MONGODB_URI}`);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
});
// ----------------------------------------------------------

// ------------------- ROUTES -------------------
app.use("/auth", authRoutes);

// Protect users route with admin role
app.use("/users", auth(["admin"]), userRoutes);

app.use("/courses", courseRoutes);
app.use("/blogs", blogRoutes);
app.use("/gallery", galleryRoutes);
app.use("/payment", paymentRoutes); // ✅ handled by paymentController.js
app.use("/contact", contactRoutes);
app.use("/workshops", workshopRoutes);

// Test blog post route (optional, keep or remove)
app.post("/api/blogs", (req, res) => {
  console.log("Incoming request body:", req.body);
  res.status(200).json({ message: "Received" });
});
// ---------------------------------------------------

// ------------------- SERVE FRONTEND -------------------
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// Catch-all for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});
// ---------------------------------------------------------

// ------------------- START SERVER -------------------
const PORT = process.env.REACT_APP_API_URL || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
// ---------------------------------------------------

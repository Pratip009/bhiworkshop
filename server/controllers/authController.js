const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your generated app password
  },
});

// Load HTML template
const loadEmailTemplate = (username) => {
  const templatePath = path.join(__dirname, "../emails/register.html");
  let template = fs.readFileSync(templatePath, "utf-8");
  template = template.replace(/{{username}}/g, username);
  template = template.replace(/{{year}}/g, new Date().getFullYear());
  return template;
};

// Register user
// ✅ Fixed register controller
exports.register = async (req, res) => {
  try {
    const { username, email, password, contact, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ username, email, password, contact, role });
    await user.save();

    // ✅ Send response first
    res.status(201).json({
      success: true,
      message: "User registered successfully ✅",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        contact: user.contact,
        role: user.role,
      },
    });

    // 👇 Send email asynchronously (won’t block response)
    const htmlContent = loadEmailTemplate(username);
    transporter.sendMail({
      from: `"BHI Workshop" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to BHI Workshop!",
      html: htmlContent,
    }).catch((err) => console.error("❌ Email failed:", err.message));

  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid credentials");
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      username: user.username,
      contact: user.contact,
      email: user.email,
    },
    process.env.JWT_SECRET ||
      "989face8876d8d2283954254a43496eba7bcd1f28849247d58e93354dbdd7573cbac1da64ae0f0d87294ebe958a8d91065f36a1a811dd6f8208794559ce42d70092047172dd51fb3402ef67c7a11886b5114ae1d46392caf5afad16336e0e96fa2f70847dab23f481c0967d792981810a8b7cd6fac3d329bf378ccc003b38c86f88776626e3b3700d23069bbfb37429f788a1f75d80cad51ae97ea7aa211526c15be0c1fb78056b001dacd6e847002274f1225910e7177df1c8cd9d9fa1e5fbac6d8c39f3bc2b6bd7a48f95b924c1826ca4ab3fbbfef757caec5c5def2c3863a775b5bc62fd29c55efada0543762491df86be616764ad456356019404049a730", // Use fallback in case env is missing
    { expiresIn: "7d" }
  );
  res.json({ token });
};

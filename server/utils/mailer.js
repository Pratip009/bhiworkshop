// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // app password or email password
  },
});

const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Your Academy" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent to", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
};

module.exports = sendMail;

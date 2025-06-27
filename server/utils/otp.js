const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

exports.sendOTPEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  return transporter.sendMail(mailOptions);
};
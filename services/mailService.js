const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "adrianmota152@gmail.com",
    pass: "ofhyghvotxegdsiv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "ofhyghvotxegdsiv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "72fc5be7a106ed",
    pass: "b1664fd95e46f0",
  },
});
module.exports = transport;

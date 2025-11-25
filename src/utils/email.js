const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "d8e4954e3d2d3e",
    pass: "22d50fe0cc4660",
  },
});

const sendEmail = async (email, subject, dataToSend) => {
  const info = await transporter.sendMail({
    from: "WB",
    to: email,
    subject,
    text: dataToSend,
  });
  return info;
};

module.exports = { sendEmail };

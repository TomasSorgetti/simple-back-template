const { emailConfig } = require("../config/index.config");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const { HttpError } = require("../utils/customErrors");

const transporter = nodemailer.createTransport({
  service: emailConfig.email_service,
  auth: {
    user: emailConfig.email,
    pass: emailConfig.email_password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const validateEmail = async ({ name, lastname, email, code }) => {
  const filePath = path.join(
    __dirname,
    "../templates/verification.template.html"
  );
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = { name, lastname, code };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: emailConfig.email,
    replyTo: email,
    to: email,
    subject: "Please confirm your account",
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

module.exports = { validateEmail };

require("dotenv").config();

module.exports = {
  email: process.env.EMAIL,
  email_password: process.env.EMAIL_PASSWORD,
  email_service: process.env.EMAIL_SERVICE,
};

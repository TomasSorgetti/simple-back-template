const jwt = require("jsonwebtoken");

/**
 * Token generator function that returns a token
 * @param {*} user
 * @param {*} expires
 * @param {*} secret
 * @returns
 */
const generateToken = (user, expires, secret) => {
  const token = jwt.sign(user, secret, {
    expiresIn: expires,
  });
  return token;
};

module.exports = { generateToken };

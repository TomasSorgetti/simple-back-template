const { jwtConfig } = require("../../config/index.config");
const db = require("../../database/connection");
const { validateEmail } = require("../../shared/email.service");
const { comparePassword, hashPassword } = require("../../utils/bcrypt");
const { generateCookie, deleteCookie } = require("../../utils/cookieHandle");
const { HttpError } = require("../../utils/customErrors");
const { generateToken } = require("../../utils/jsonwebtoken");

/**
 * find a user by email and compare password. if match, generate tokens and send response
 * @param {*} res
 * @param {*} param1
 * @returns
 */
const login = async (res, { email, password, persist }) => {
  // find user
  const user = await db.user.findOne({ where: { email } });
  if (!user) throw new HttpError(404, "User not found");
  // if user is not verified send error
  if (!user.userVerified) throw new HttpError(401, "User not verified");
  // validate password
  const validPassword = comparePassword(password, user.password);
  if (!validPassword) throw new HttpError(401, "Invalid password");
  // create tokens
  const userSimplified = {
    id: user.id,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
  };
  const accessToken = generateToken(userSimplified, "15m", jwtConfig.secret);
  const refreshExpires = persist
    ? 110 * 24 * 60 * 60 * 1000
    : 48 * 60 * 60 * 1000;
  const refreshToken = generateToken(
    userSimplified,
    refreshExpires,
    jwtConfig.refreshSecret
  );
  // set cookie
  generateCookie(res, refreshToken, refreshExpires);
  // send response
  return { accessToken, user: userSimplified };
};

/**
 * Register a new user if the email is not already taken
 * @param {*} param0
 * @returns
 */
const register = async ({ name, lastname, email, password }) => {
  name = name.trim();
  lastname = lastname.trim();
  email = email.trim();
  password = password.trim();
  //todo si el usuario no verifica el codigo, pero intenta crearse denuevo la cuenta, deberia manerjarlo
  //todo make roles
  // find user if exists, if not, create
  const foundUser = await db.user.findOne({ where: { email } });
  if (foundUser) throw new HttpError(409, "User already exists");
  // hash password
  const hashedPassword = hashPassword(password);
  // generate verification code
  const code = Math.floor(1000 + Math.random() * 9000);
  // create user
  const user = await db.user.create({
    name,
    lastname,
    email,
    password: hashedPassword,
    verificationCode: code,
    userVerified: false,
  });
  // send email
  await validateEmail({ name, lastname, email, code });
  // return simplified user
  const userSimplified = { ...user.dataValues };
  delete userSimplified.password;
  return userSimplified;
};

/**
 * Verify a user if the code is correct
 * @param {*} param0
 * @returns
 */
const verifyUser = async ({ email, code }) => {
  // find user
  const user = await db.user.findOne({ where: { email, userVerified: false } });
  if (!user) throw new HttpError(404, "User not found");
  if (user.verificationCode !== code) throw new HttpError(401, "Invalid code");
  // update user
  user.userVerified = true;
  user.verificationCode = 0;
  await user.save();
  // return simplified user
  const userSimplified = { ...user.dataValues };
  delete userSimplified.password;
  return userSimplified;
};

/**
 * Delete a cookie to logout
 * @param {*} res
 * @returns
 */
const logout = async (res) => {
  return deleteCookie(res);
};

const refresh = async () => {
  return "NOT_IMPLEMENTED";
};

module.exports = {
  login,
  register,
  verifyUser,
  logout,
  refresh,
};

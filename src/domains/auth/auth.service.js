const { jwtConfig } = require("../../config/index.config");
const db = require("../../database/connection");
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
    : 24 * 60 * 60 * 1000;
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
  const foundUser = await db.user.findOne({ where: { email } });
  if (foundUser) throw new HttpError(409, "User already exists");
  const hashedPassword = hashPassword(password);
  const user = await db.user.create({
    name,
    lastname,
    email,
    password: hashedPassword,
  });
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
  logout,
  refresh,
};

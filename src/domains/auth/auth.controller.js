const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/responseHandler");
const service = require("./auth.service");

/**
 * Resives data from login, and returns a token and user if the credentials are correct
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  const { email, password, persist } = req.body;
  try {
    const data = await service.login(res, { email, password, persist });
    sendSuccessResponse(res, "Login success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

/**
 * Resives data from register, and creates a user if is not already registered
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  try {
    const data = await service.register({ name, lastname, email, password });
    sendSuccessResponse(res, "Register success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

/**
 * Resives the code, and verify the user
 * @param {*} req
 * @param {*} res
 */
const verifyUser = async (req, res) => {
  const { email, code } = req.body;

  try {
    const data = await service.verifyUser({ email, code });
    sendSuccessResponse(res, "Verify success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

const logout = async (req, res) => {
  try {
    const data = await service.logout(res);
    sendSuccessResponse(res, "Logout success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

//todo
const refresh = async (req, res) => {
  try {
    const data = await service.refresh();
    sendSuccessResponse(res, "Refresh success", data);
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

module.exports = {
  login,
  register,
  verifyUser,
  logout,
  refresh,
};

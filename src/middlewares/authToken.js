const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/httpError");
const { jwtConfig } = require("../config/index.config");
const { sendErrorResponse } = require("../../utils/responseHandler");

const authToken = async (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) throw new HttpError(401, "No token provided");
  try {
    const decoded = jwt.verify(token, jwtConfig);
    if (!decoded) throw new HttpError(401, "Invalid token");
    req.user = verified;
    next();
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

module.exports = authToken;

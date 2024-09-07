const { sendErrorResponse } = require("./responseHandler");

const errorHandler = (err, req, res, next) => {
  sendErrorResponse(res, "Error interno del servidor", 500, err.message);
};

module.exports = errorHandler;

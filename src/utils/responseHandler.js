const sendSuccessResponse = (res, message, data = {}) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

const sendErrorResponse = (
  res,
  message,
  statusCode = 500,
) => {
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};

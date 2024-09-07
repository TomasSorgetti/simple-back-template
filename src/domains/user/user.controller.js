const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../../utils/responseHandler");
const service = require("./user.service");

/**
 * interactua con el servicio para obtener un usuario y envia la respuesta
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    const user = await service.getUser();
    if (!user) {
      return sendErrorResponse(res, "Usuario no encontrado", 404);
    }
    sendSuccessResponse(res, "Usuario encontrado", { user });
  } catch (error) {
    sendErrorResponse(res, error.message, error.status);
  }
};

module.exports = {
  getUser,
};

const mongoose = require("mongoose");
const ApiError = require("../error/ApiError");

const idValidator = (req, res, next) => {
  const { userId, chatId } = req.params;

  if (userId) {
    const isUserIdValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isUserIdValid) throw ApiError.badRequest("Invalid user id");
  }

  if (chatId) {
    const isChatIdValid = mongoose.Types.ObjectId.isValid(chatId);
    if (!isChatIdValid) throw ApiError.badRequest("Invalid chat id");
  }

  next();
};

module.exports = { idValidator };

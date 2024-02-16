const express = require("express");
const auth = require("../middleware/auth.js");
const {
  getChats,
  getChat,
  createPrivateChat,
  createMessage,
  deleteChat,
  addMember,
} = require("../controllers/chat.controller.js");
const { idValidator } = require("../middleware/idValidator.js");

const router = express.Router();

router.get("/", getChats);
router.get("/:chatId", idValidator, getChat);

router.post("/private", createPrivateChat);

router.post("/:chatId", idValidator, createMessage);

router.put("/:chatId/add-member", idValidator, addMember);

router.delete("/:chatId", idValidator, deleteChat);

module.exports = router;

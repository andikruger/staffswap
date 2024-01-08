import express from "express";
const router = express.Router();
import { sendMessage, getMessages } from "../controllers/message.controller.js";

router.post("/", sendMessage);
router.get("/:chatId", getMessages);
export default router;

import express from "express";

const router = express.Router();

import { accessChats, fetchAllChats } from "../controllers/chat.controller.js";
router.post("/", accessChats);
router.get("/", fetchAllChats);

export default router;

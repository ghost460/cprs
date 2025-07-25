// routes/chat.routes.js
import express from "express";
import { getConversation, sendMessage } from "../controllers/chat.controller.js";

const chatrouter = express.Router();

chatrouter.get("/conversation", getConversation);
chatrouter.post("/send", sendMessage);

export default chatrouter;

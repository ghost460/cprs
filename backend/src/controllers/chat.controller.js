// controllers/chat.controller.js
import Message from "../models/chat.js";

export const getConversation = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: parseInt(senderId), receiverId: parseInt(receiverId) },
        { senderId: parseInt(receiverId), receiverId: parseInt(senderId) },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error in getConversation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    console.error("Error in sendMessage:", err);
    res.status(500).json({ error: err.message });
  }
};

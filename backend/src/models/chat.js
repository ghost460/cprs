import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  
  senderId: {
    type: Number,           // From MySQL User.id (Doctor or Patient)
    required: true,
  },
  receiverId: {
    type: Number,           // From MySQL User.id
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message; //
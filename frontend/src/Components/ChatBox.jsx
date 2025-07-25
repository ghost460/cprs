import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import Adminpanel from "../adminpanel/Adminpanel";
import "../css/ChatBox.css"; //

const socket = io("http://localhost:5000");

const ChatBox = ({ receiverId }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const senderId = user?.role === "DOCTOR" ? user?.doctorId : user?.id;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [allowed, setAllowed] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!senderId || !receiverId) return;

    const room = `${Math.min(senderId, receiverId)}-${Math.max(
      senderId,
      receiverId
    )}`;
    socket.emit("joinRoom", room);

    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    return () => socket.off("newMessage");
  }, [senderId, receiverId]);

  useEffect(() => {
    if (!senderId || !receiverId) return;

    axios
      .get(`http://localhost:5000/api/appointment/check-permission`, {
        params: { senderId, receiverId },
      })
      .then((res) => {
        setAllowed(res.data.isAllowed);
      })
      .catch((err) => {
        console.error("Permission check failed:", err);
        setAllowed(false);
      });

    axios
      .get(`http://localhost:5000/api/chat/conversation`, {
        params: { senderId, receiverId },
      })
      .then((res) => {
        setMessages(res.data);
        scrollToBottom();
      })
      .catch((err) => {
        console.error("Fetching chat history failed:", err);
      });
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = {
      senderId,
      receiverId,
      content: input,
      timestamp: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/api/chat/send", msg);
      socket.emit("sendMessage", msg);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!allowed) {
    return (
      <Adminpanel>
        <p className="permission-message">
          Chat is only available after doctor confirms the appointment.
        </p>
      </Adminpanel>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isSender = parseInt(msg.senderId) === parseInt(senderId);
          return (
            <div
              key={i}
              className={`message-row ${isSender ? "sent" : "received"}`}
            >
              <div
                className={`message-bubble ${
                  isSender ? "sent-bubble" : "received-bubble"
                }`}
              >
                <div className="message-text">{msg.content}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button
          className={`send-button ${input.trim() ? "active" : ""}`}
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

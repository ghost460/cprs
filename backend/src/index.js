import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import connectDB from "./db/db.js";

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();
connectDB(); // Connect MongoDB

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// ========================================
// ✅ SOCKET.IO SETUP
// ========================================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// 🔗 Attach io to all incoming requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Optional: Store connected user sockets
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  // User registration to map user ID to socket ID
  socket.on("registerUser", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`🔗 User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("joinRoom", (appointmentId) => {
    socket.join(appointmentId);
    console.log(`Socket ${socket.id} joined room ${appointmentId}`);
  });

  socket.on("sendMessage", (msg) => {
    const room = `${Math.min(msg.senderId, msg.receiverId)}-${Math.max(msg.senderId, msg.receiverId)}`;
    io.to(room).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
    if (userId) delete userSocketMap[userId];
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

// ========================================
// ✅ ROUTES
// ========================================
import router from "./routes/hospital.router.js";
app.use("/api/hospitals", router);

import Labrouter from "./routes/Labtech.router.js";
app.use("/api/LabTechReg", Labrouter);

import otprouter from "./routes/otp.router.js";
app.use("/api/otp", otprouter);

import patientregrouter from "./routes/patientreg.router.js";
app.use("/api/patientreg", patientregrouter);

import doctorrouter from "./routes/doctorreg.router.js";
app.use("/api/DoctorReg", doctorrouter);

import userauthroutes from "./routes/userAuth.routes.js";
app.use("/api", userauthroutes);

import addDoctorToHos from "./routes/addDoctorToHospital.router.js";
app.use("/api", addDoctorToHos);

import searchPatientrouter from "./routes/searchPatient.router.js";
app.use("/api", searchPatientrouter);

import hospitaldoctorsrouter from "./routes/searchHospitalsDoctors.route.js";
app.use("/api", hospitaldoctorsrouter);

import patientHsitoryrouter from "./routes/medicalHistory.route.js";
app.use("/api", patientHsitoryrouter);

import patientListAssignToDoctorrouter from "./routes/getPatientAssignToDoctor.router.js";
app.use("/api", patientListAssignToDoctorrouter);

import labtestlistrouter from "./routes/labtest.route.js";
app.use("/api", labtestlistrouter);

import patientAuthRouter from "./routes/patientAuth.routes.js";
app.use("/api", patientAuthRouter);

import getPatientDetailsRouter from "./routes/viewPatientDetails.routes.js";
app.use("/api", getPatientDetailsRouter);

import Appointmentrouter from "./routes/Appoinntment_.router.js";
app.use("/api", Appointmentrouter);

// ✅ New chat & video-related routes
import chatRoutes from "./routes/chat.routes.js";
app.use("/api/chat", chatRoutes);

import videoRoutes from "./routes/video.routes.js";
app.use("/api/video", videoRoutes);

import permissionRoutes from "./routes/appointmentPermission.routes.js";
app.use("/api/appointment", permissionRoutes);


import conferenceRoute from "./routes/conference.routes.js";
app.use("/api/conference", conferenceRoute);




// ========================================
// ✅ START SERVER
// ========================================
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

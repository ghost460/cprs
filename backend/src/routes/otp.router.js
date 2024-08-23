import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/otp.Controller.js";

const otprouter = Router();

// Route to send OTP
otprouter.post("/send-otp", sendOTP);

// Route to verify OTP
otprouter.post("/verify-otp", verifyOTP);

export default otprouter;

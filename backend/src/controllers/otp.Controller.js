import nodemailer from 'nodemailer';
import crypto from 'crypto';

// In-memory storage for OTPs
const otpStore = new Map();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
  //service: 'gmail',
  auth: {
    user: "screstaurant3@gmail.com",//process.env.EMAIL_USER
    pass:"rddz soyw maqo egcv" ,//process.env.EMAIL_PASSWORD
  },
  secure:false,
});

// Send OTP Controller
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  // Generate a random OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Save OTP in in-memory store with an expiration time (5 minutes)
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };


    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error in sendOTP:', err);
    res.status(500).json({ message: 'Failed to generate or send OTP' });
  }
};

// Verify OTP Controller
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  console.log(req.body)

  try {
    // Retrieve the stored OTP from in-memory store
    const storedData = otpStore.get(email);
    console.log(storedData)
    if (!storedData) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    if (storedData.expiresAt < Date.now()) {
      otpStore.delete(email); // Clean up expired OTPs
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (storedData.otp.trim() == otp.trim()) {
        
      // OTP is correct
      otpStore.delete(email); // Optionally delete the OTP after successful verification
      res.status(200).json({ message: 'OTP verified successfully' });
      
    } else {
      // OTP is incorrect
      res.status(400).json({ message: 'Invalid OTP' });
      
    }
  } catch (err) {
    console.error('Error in verifyOTP:', err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

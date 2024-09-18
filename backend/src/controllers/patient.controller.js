
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ascynHandlar } from '../utils/asyncHandler.js';
import { Apierror } from '../utils/Apierror.js';

const prisma = new PrismaClient();

function generateAccessToken(patient) {
  return jwt.sign(
    {
      id: patient.id,
      username: patient.fullName,
      role: "PATIENT",
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // e.g., '15m'
    }
  );
}



async function loginPatient(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
    
  try {
    // Find the user by username
    const patient = await prisma.Patient.findUnique({
      where: {
        email: email,
      },
    });
    console.log("Patient Data",patient)
    
    if (!email) {
      return res.status(404).json({ error: 'User not found' });
    }
   
    // Check if the password is correct
    const isCorrect = await bcrypt.compare(password, patient.password);
        
    if (!isCorrect) {
      
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(patient);
   
    console.log("Password correct")
   
    // Send tokens as cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true, // Use secure cookies in production
      sameSite: 'None',
      maxAge: 200 * 60 * 1000, // 15 minutes
    });

    // Prepare user data to send to the frontend
    const userData = {
        id: patient.id,
        fullName: patient.fullName,
        role: "PATIENT",
        profilePicture: patient.profilePicture,
      };
    res.status(200).json({ message: 'Login successful', 
        userData
     });
     console.log(userData)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
}


//logout controller 
async function logoutPatient(req, res) {
      // Clear cookies
      res.clearCookie('accessToken');
      res.status(200).json({ message: 'Logout successful' });
    }
   


  const refreshAccessToken = ascynHandlar(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new Apierror(401, "Unauthorized request");
    }
  
    try {
      // Verify the incoming refresh token
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      // Find the user by decoded token id and verify the stored refresh token matches
      const user = await prisma.user.findUnique({
        where: {
          id: decodedToken.id,
          refreshToken: incomingRefreshToken, // Ensure the token matches the one in the DB
        },
      });
  
      if (!user) {
        throw new Apierror(403, "Forbidden: Invalid refresh token");
      }
  
      // Generate a new access token
      const newAccessToken = generateAccessToken(user);
  
      // Send the new access token as a cookie
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true, // Use secure cookies in production
        sameSite: 'None',
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
  
      // Optionally, send the new access token in the response body as well
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      throw new Apierror(403, "Forbidden: Invalid refresh token");
    }
  });

//token authentication 
  function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user; // Attach user data to the request
      next();
    });
  }
  
  export { loginPatient,logoutPatient };
  
 
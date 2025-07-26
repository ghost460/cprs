
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ascynHandlar } from '../utils/asyncHandler.js';
import { Apierror } from '../utils/Apierror.js';

const prisma = new PrismaClient();

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // e.g., '15m'
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // e.g., '7d'
    }
  );
}

async function loginUser(req, res) {
  const { username, password } = req.body;
    console.log(username, password);
  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
   
    // Check if the password is correct
    const isCorrect = await bcrypt.compare(password, user.password);
        console.log(await bcrypt.hash(password, 10));
    if (!isCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Store the refresh token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // Send tokens as cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true, // Use secure cookies in production
      sameSite: 'None',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'None', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Prepare user data to send to the frontend
    const userData = {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: user.fullName, // Assuming you have `fullName` in your user model
        profilePicture: user.profilePicture,
      };
  
      if (user.role === 'DOCTOR' && user.doctorId) {
        const doctor = await prisma.doctor.findUnique({
          where: { id: user.doctorId },
        });
        Object.assign(userData, { doctorId: user.doctorId, fullName: doctor.fullName, profilePicture:doctor.profilePicture });
      } else if (user.role === 'LAB_TECHNICIAN' && user.labTechnicianId) {
        const labtechnician = await prisma.labTechnician.findUnique({
          where: { id: user.labTechnicianId },
        });
        Object.assign(userData, { labTechnicianId: user.labTechnicianId, fullName: labtechnician.fullName, profilePicture:labtechnician.profilePicture, HospitalId:labtechnician.hospitalId });
      } else if (user.role === 'ADMIN' && user.HospitalId) {
        const hospital = await prisma.hospital.findUnique({
          where: { id: user.HospitalId },
        });
        Object.assign(userData, { HospitalId: user.HospitalId, fullName: hospital.hospitalName });
      }
  
  

    res.status(200).json({ message: 'Login successful', 
        userData
     });
     console.log(userData)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
}


//logout controller 
async function logoutUser(req, res) {
    const { refreshToken } = req.cookies;
  
    if (!refreshToken) return res.sendStatus(204); // No content
  
    try {
      // Find the user with the refresh token
      const user = await prisma.user.findFirst({
        where: { refreshToken },
      });
  
      if (!user) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.sendStatus(204); // No content
      }
  
      // Delete the refresh token in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: null },
      });
  
      // Clear cookies
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during logout' });
    }
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
  
  export { loginUser, logoutUser, generateAccessToken, generateRefreshToken, refreshAccessToken, authenticateToken};
  
 
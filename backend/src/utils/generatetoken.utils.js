
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username, // Assuming username is stored in the user model
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
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
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
}
async function isPasswordCorrect(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }
  

export{generateAccessToken, generateRefreshToken, isPasswordCorrect}

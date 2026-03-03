import express from 'express';
import { User } from '../models/schemas/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/nodemailer.js';

const router = express.Router();

// --- REGISTER / SIGN UP ---
router.post('/register', async (req, res) => {
  try {
    // 1. Destructure email from the body
    const { username, email, password } = req.body; 

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 2. Pass the email to the new User
    const newUser = new User({
      username,
      email, // Add this line
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered!" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LOGIN (WITH JWT + COOKIE) ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const payload = {
      _id: user._id,
      email: user.email,
      username: user.username
    };

    // Create the Token
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      payload, secret,
      // { id: user._id, username: user.username }, 
      // process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );



    // Send the Token as a Cookie
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({ 
      message: "Login Successful",
      token, // Also sending token in JSON for Postman testing
      user: { id: user._id, username: user.username } 
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

export function generateRandomPassword() {
  return Math.floor(
    Math.random() * (10 ** 8)
  ).toString().padStart(8, '0');
}

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    const randomPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, passwordReset: true },
      { new: true }
    );

     if (!user) return res.status(404).json({ error: "User tidak ditemukan" });

    await sendEmail (email, 'Password Reset KADA', `Password baru kamu: ${randomPassword}`);
    
    res.json({ result: 'success', message: "udah dikirim brok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
import express from 'express';
import { User } from '../models/schemas/index.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Register Logic
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Cek apakah user sudah ada (opsional tapi disarankan)
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username atau Email sudah terdaftar" });
    }

    // 2. Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Simpan user dengan password yang sudah di-hash
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword // Simpan versi aman
    });

    await user.save();
    res.status(201).json({ message: "Registration Successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Logic
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Cari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Bandingkan password input dengan hash di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    // Jika sukses (biasanya di sini Anda akan mengembalikan token JWT)
    res.status(200).json({ 
      message: "Login Successful",
      user: { id: user._id, username: user.username } 
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
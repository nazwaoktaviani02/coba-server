import 'dotenv/config'; 
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser'; 

// Import your custom middleware instead of passport
import { verifyToken } from './middleware/auth.js'; 

import authRoutes from './routes/users.js';
import notesRoutes from './routes/notes.js';

const app = express();

// --- STEP 1: PARSERS ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// --- STEP 2: CORS ---
app.use(cors({ 
  origin: true, 
  credentials: true 
}));

// --- STEP 3: DATABASE CONNECTION ---
// Note: In a real app, move this URL to your .env file!
mongoose.connect(
  "mongodb+srv://user01:admin123@cluster0.desnfid.mongodb.net/Cluster0?retryWrites=true&w=majority"
)
.then(() => console.log("✅ Connect DB"))
.catch(err => console.log(err));  

// --- STEP 4: ROUTES ---

// Public Routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => res.send(' Halooo'));
app.get('/about', (req, res) => res.send(' About Me'));

// PROTECTED ROUTE:
// We replaced the passport.authenticate block with your verifyToken function
app.use('/notes', verifyToken, notesRoutes);

// --- STEP 5: ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    result: 'fail',
    error: err.message,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;
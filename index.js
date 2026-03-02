import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

mongoose.connect(
  "mongodb+srv://user01:admin123@cluster0.desnfid.mongodb.net/Cluster0?retryWrites=true&w=majority"
)
.then(() => console.log("✅ Connect DB"))
.catch(err => console.log(err));  

const app = express();

// --- MIDDLEWARE (Order Matters!) ---
app.use(cors({ origin: "*" }));
app.use(express.json()); // Moved up! Must be before routes to read req.body

app.use((req, res, next) => {
  res.locals.msg = `Ini adalah halaman:`;
  next();
});

// --- BASIC ROUTES ---
app.get('/', (req, res) => res.send(' Halooo'));
app.get('/about', (req, res) => res.send(' About Me'));

// --- API ROUTES (Registered BEFORE listen) ---
app.use('/api/auth', authRoutes);
app.use('/notes', notesRoutes);

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  res.status(500).json({
    result: 'fail',
    error: err.message,
  });
});

// --- START SERVER (Always at the very bottom) ---
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;
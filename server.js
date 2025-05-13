import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js'; // Uncomment if needed

dotenv.config();

// DB connection
connectDB();

// App initialization
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes); // Uncomment when user routes are ready

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.bgMagenta);
});

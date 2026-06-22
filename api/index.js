import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import stationeryRoutes from './routes/stationery.js';
import demandsRoutes from './routes/demands.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/stationery', stationeryRoutes);
app.use('/api/demands', demandsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Export for Vercel Serverless Functions
export default app;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Configure CORS to only allow your frontend URL
// (In production, you'll set FRONTEND_URL in your hosting provider's dashboard)
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// 2. Add Rate Limiting to prevent proxy abuse (Max 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests, please try again later.' }
});
// Apply rate limiter only to the API routes
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', apiRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

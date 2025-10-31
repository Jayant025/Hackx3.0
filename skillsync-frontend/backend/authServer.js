// backend/authServer.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.AUTH_PORT || 5001;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/auth/health', (req, res) => res.json({ status: 'ok', message: 'Auth server running' }));

app.use((err, req, res, next) => {
  console.error('Auth server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`🔐 Auth server running on http://localhost:${PORT}`));

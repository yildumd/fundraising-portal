const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;  // Critical change for Render

// Configure CORS for both local dev and production
app.use(cors({
  origin: [
    "http://localhost:5173",         // Local development
    "https://your-vercel-app.vercel.app"  // Your live frontend URL
  ]
}));

// Mock data
const userData = {
  name: "David Yildum",
  referralCode: "yildum2025",
  amountRaised: 1250,
  rewards: ["Bronze Badge", "Early Supporter"]
};

// API endpoint
app.get('/api/user', (req, res) => {
  res.json(userData);
});

// Health check endpoint (required by Render)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// This sets up a Node.js server with Express
const express = require('express'); // Import Express
const cors = require('cors'); // Import CORS (to allow React to connect)

const app = express(); // Create the Express app
const PORT = 5000; // The backend will run on port 5000

// Allow requests from your React frontend (running on port 5173)
app.use(cors({
  origin: "http://localhost:5173" 
}));

// Mock data for your intern dashboard
const userData = {
  name: "David Yildum",
  referralCode: "yildum2025", // Your custom referral code
  amountRaised: 1250, // Example fundraising amount
  rewards: ["Bronze Badge", "Early Supporter"] // Example rewards
};

// Create the API endpoint
app.get('/api/user', (req, res) => {
  res.json(userData); // Send the mock data as JSON
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
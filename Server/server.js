// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/rooms", roomRoutes); // Route for room management
app.use("/api/users", userRoutes); // Route for user management

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

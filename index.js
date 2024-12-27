import express from "express";
import userRoutes from "./routers/users.js";
import authRoutes from './routers/authroute.js';
import taskRoutes from './routers/task.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authenticateUser from "./middlewares/authenticateUser.js";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file.");
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  

  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
})
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connection error:", err.message));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/task', authenticateUser, taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Route -> Request -> Controllers -> Service -> Response
// Route: Defines the path and HTTP method
// Controller: Takes data from the request, validates it
// Service: Handles database or business logic operations
// Response: Sends back the processed data or error

import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import pool from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import buildRoutes from "./src/routes/buildRoutes.js";
import cartRotues from "./src/routes/cartRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend running 🚀",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: result.rows[0].current_time
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy", 
      database: "disconnected",
      error: error.message
    });
  }
});

// Auth routes
app.use("/api/auth", authRoutes);

// Product routes
app.use("/api/products", productRoutes);

// Build Routes
app.use("/api/builds", buildRoutes)

// Cart Routes
app.use("/api/cart", cartRotues);

// TODO
// Order Routes

// review Routes

// admin Routes

// Start server local host
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// For web
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
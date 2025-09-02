import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// Initialize express app
const app = express();

// Connect DB
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} ☑️`);
});

// todo: 05:04:18
import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./configs/db.js";
import userRouter from "./routes/User.routes.js";

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

// Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} ☑️`);
});

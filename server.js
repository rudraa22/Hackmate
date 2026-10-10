import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users" , userRoutes);

app.get("/",(req,res) => {
    res.send("Hackmate API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT , () =>
{
    console.log(`Server running on ${PORT}`);
});
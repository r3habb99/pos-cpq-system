import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

export default app;

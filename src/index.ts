import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { authRoutes, transactionRoutes, userRoutes } from "@routes";
import { HttpException } from "@utils";

dotenv.config();

export const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  throw new HttpException(500, "Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

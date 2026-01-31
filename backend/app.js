import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();


app.use(cors({
  origin: [
    "myacademy-online.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["*"],   
  credentials: true,
}));
;
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/admin", adminRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;

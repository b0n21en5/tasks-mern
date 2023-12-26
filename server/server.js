import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoute from "./routes/taskRoute.js";
import { connectDB } from "./helpers/connectDB.js";

dotenv.config();

const app = express();

connectDB();

// middlewares
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://tasks-todo-daily.netlify.app"
        : "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT;

// routes
app.use("/api", taskRoute);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

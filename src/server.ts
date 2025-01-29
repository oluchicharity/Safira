import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./Routes/userRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 2002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/users/api/auth/',userRouter );

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to SAFIRA!! (SAFE & ALERT)");
});

const mongodb = process.env.MONGO_URI;
if (!mongodb) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("SAFIRA is Connected to the Database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "An unexpected error occurred", error: err.message });
});

app.listen(port, () => {
  console.log(`SAFIRA is running on port ${port}`);
});

export default app;

import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts"

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
//@ts-ignore
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoutes)
app.use('/posts', postRoutes)


mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`listening on: ${PORT}`);
    app.listen(PORT);
  })
  .catch(() => {
    console.error("failed to connect to mongo");
  });

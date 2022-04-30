import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import Routes
import authRoute from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Routes
app.use("/api/auth", authRoute);

const db = "mongodb://localhost/react-infinty-scroll";
const port = 3001;

mongoose
  .connect(db)
  .then(() => {
    app.listen(process.env.PORT || port, () =>
      console.log(`Server Started...`)
    );
  })
  .catch((e) => console.log(e));

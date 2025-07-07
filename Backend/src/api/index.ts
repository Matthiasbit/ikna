import express from "express";
import setRouter from "./routes/Set";
import cors from "cors";
import userRouter from "./routes/user";
import cardsRouter from "./routes/cards";
import loginRouter from "./routes/login";
import helmet from "helmet";
import {Request, Response} from "express";


const app = express();
app.use(helmet());
app.use(cors({
  origin: [
    "https://matthiasbit.github.io/ikna",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json()); 
app.use("/", setRouter)
app.use("/", userRouter);
app.use("/", cardsRouter);
app.use("/", loginRouter);


app.get("/", (_, res) => { 
  res.send("Hello express");
});

module.exports = app;

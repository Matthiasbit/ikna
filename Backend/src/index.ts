import express from "express";
import setRouter from "./routes/Set";
import cors from "cors";
import userRouter from "./routes/user";
import cardsRouter from "./routes/cards";
import loginRouter from "./routes/login";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/", setRouter)
app.use("/", userRouter);
app.use("/", cardsRouter);
app.use("/", loginRouter);


app.get("/", (_, res) => { 
  res.send("Hello express");
});


app.listen(80);
console.log('Server ready on port 80.');

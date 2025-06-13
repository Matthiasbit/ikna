import express from "express";
import setRouter from "./Set/Set";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", setRouter)

app.get("/", (_, res) => { 
  res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");

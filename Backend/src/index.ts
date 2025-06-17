import express from "express";
import setRouter from "./Set/Set";
import cors from "cors";
import settingsRouter from "./Settings/settings";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", setRouter)
app.use("/", settingsRouter);

app.get("/", (_, res) => { 
  res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");

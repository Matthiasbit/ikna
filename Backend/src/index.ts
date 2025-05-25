import express from "express";
import setRouter from "./Set/Set";
import cors from "cors";
import settingsRouter from "./Settings/settings";
import {db} from "./db"
import {set} from "./db/schema";
import cardsRouter from "./routes/cards";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", setRouter)
app.use("/", settingsRouter);
app.use("/", cardsRouter);

app.get("/", (_, res) => { 
  res.send("Hello express");
});

app.listen(80);
console.log("Server started at http://localhost:80");

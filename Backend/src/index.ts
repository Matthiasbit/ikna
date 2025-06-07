import express from "express";
import cors from "cors";
import {db} from "./db"
import {set} from "./db/schema";
import cardsRouter from "./routes/cards";
import registrieren from "./routes/registrierung";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", cardsRouter);

app.use("/", registrieren);

app.get("/", (_, res) => { 
  res.send("Hello express");
});

db.select().from(set).then((data) => {
  console.log("Data from database:", data);
});

app.post("/getQuestion", (_, res) => {
  res.json(
    {
      id: 1,
      question: "Was ist der Unterschied zwischen einer Katze und einem Hund?",
      answer: "Hund heißt Matthias"
    });
  });
app.listen(80);
console.log("Server started at http://localhost:80");

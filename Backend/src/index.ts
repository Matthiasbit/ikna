import express from "express";
import cors from "cors";
import {db} from "./db"
import {set} from "./db/schema";

const app = express();

app.use(cors());

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

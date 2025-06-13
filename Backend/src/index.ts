import express from "express";
import setRouter from "./Set/Set";
import cors from "cors";
import settingsRouter from "./Settings/settings";
import {db} from "./db"
import {set} from "./db/schema";
import cardsRouter from "./routes/cards";
import registrationRouter from "./routes/registration";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/", setRouter)
app.use("/", settingsRouter);
app.use("/", cardsRouter);

app.use(registrationRouter);


app.get("/", (_, res) => { 
  res.send("Hello express");
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

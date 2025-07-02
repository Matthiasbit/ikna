import express from "express";
import setRouter from "./routes/Set";
import cors from "cors";
import settingsRouter from "./routes/settings";
import cardsRouter from "./routes/cards";
import registrationRouter from "./routes/registration";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/", setRouter)
app.use("/", settingsRouter);
app.use("/", cardsRouter);
app.use("/", registrationRouter);


app.get("/", (_, res) => { 
  res.send("Hello express");
});


app.listen(80),
  console.log('Server ready on port 80.');

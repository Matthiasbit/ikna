import express from "express";
import {db} from "./db"
import {set} from "./db/schema";

const app = express();

app.get("/", (_, res) => { 
  res.send("Hello express");
});

db.select().from(set).then((data) => {
  console.log("Data from database:", data);
});
app.listen(80);
console.log("Server started at http://localhost:80");

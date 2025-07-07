import express from "express";
import setRouter from "../../src/routes/Set";
import cors from "cors";
import userRouter from "../../src/routes/user";
import cardsRouter from "../../src/routes/cards";
import loginRouter from "../../src/routes/login";
import helmet from "helmet";
import serverless from "serverless-http";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Antwort von use");
});
app.use("/", setRouter)
app.use("/", userRouter);
app.use("/", cardsRouter);
app.use("/", loginRouter);

export const handler = serverless(app);
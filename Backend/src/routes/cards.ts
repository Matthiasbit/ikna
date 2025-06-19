import { Router, Request, Response } from "express";
import { db } from "../db";
import { card } from "../db/schema";

const router = Router();

router.get("/getCards", async (_: Request, res: Response) => {
  try {
    const cards = await db.select().from(card);
    res.json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Fehler beim Laden der Karten" });
  }
});

export default router;
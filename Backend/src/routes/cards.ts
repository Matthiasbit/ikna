import { Router, Request, Response } from "express";
import { db } from "../db";
import { card } from "../db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { sortByDifficulty, leitnerSpacedRepetition } from "../utils/learningStrategies";
import { user as userTable } from "../db/schema";


const router = Router();

const updateCardSchema = z.object({
  set: z.number().optional(),
  question: z.string().optional(),
  answer: z.string().optional(),
  status: z.number().optional(),
  difficulty: z.string().optional(),
  lastreview: z.string().optional(),
});

//Alle Karten abrufen
router.get("/getCards", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      res.status(400).json({ error: "UserId fehlt" });
      return;
    }

    const user = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);
    if (!user[0]) {
      res.status(404).json({ error: "User nicht gefunden" });
      return;
    }

    const rawCards = await db.select().from(card);

    const cards = rawCards.map(c => ({
      ...c,
      set: c.set ?? 0,
      question: c.question ?? "",
      answer: c.answer ?? "",
      status: c.status ?? 0,
      difficulty: c.difficulty ?? "leicht",
      lastreview: c.lastreview ?? "",
    }));

    const userIntervals = {
      leicht: user[0].leicht,
      mittel: user[0].mittel,
      schwer: user[0].schwer,
    };

    const lernmethode = user[0].lernmethode;

    let sortedCards;
    if (lernmethode === "leitner") {
      sortedCards = leitnerSpacedRepetition(cards, userIntervals);
    } else if (lernmethode === "difficulty") {
      sortedCards = sortByDifficulty(cards, userIntervals);
    } else {
      sortedCards = cards;
    }
    res.json(sortedCards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Fehler beim Laden der Karten" });
  }
});

//Karte nach ID aktualisieren
router.put("/updateCard/:id", async (req: Request, res: Response): Promise<void>  => {
  const { id } = req.params;
  const parseResult = updateCardSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ error: "Ungültige Eingabedaten", details: parseResult.error.errors });
    return;
  }

  const updateData = parseResult.data;

  try {
    const updated = await db
      .update(card)
      .set(updateData)
      .where(eq(card.id, Number(id)))
      .execute(); 

    if (!updated || (Array.isArray(updated) && updated.length === 0)) {
      res.status(404).json({ error: "Karte nicht gefunden" });
      return; 
    }

    res.json({ message: "Karte erfolgreich aktualisiert" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Karte" });
  }
});

export default router;
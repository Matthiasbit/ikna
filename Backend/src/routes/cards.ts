import { Router, Request, Response } from "express";
import { db } from "../db";
import { card } from "../db/schema";
import { eq } from "drizzle-orm";
import z from "zod";

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
router.get("/getCards", async (_: Request, res: Response) => {
  try {
    const cards = await db.select().from(card);
    res.json(cards);
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
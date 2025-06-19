import { Router, Request, Response } from "express";
import argon2 from "argon2";
import { db } from "../db";
import { user } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const router = Router();

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string(), 
});

router.post("/registration", async (req: Request, res: Response): Promise<void> => {
  const parseResult = registrationSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Ungültige Eingabedaten", details: parseResult.error.errors });
    return;
  }
  const { email, password } = parseResult.data;
  try {
    const existingUser = await db.select().from(user).where(eq(user.email, email));
    if (existingUser.length > 0) {
      res.status(409).json({ error: "E-Mail bereits registriert" });
      return;
    }

    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    await db.insert(user).values([{
      email,
      password: passwordHash,
      leicht: 0,
      mittel: 0,
      schwer: 0,
      lernmethode: "default"
    }]);
    res.json({ message: "Registrierung erfolgreich" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Registrierung fehlgeschlagen" });
  }
});

export default router;
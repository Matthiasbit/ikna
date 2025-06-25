import { Router, Request, Response } from "express";
import argon2 from "argon2";
import { db } from "../../db";
import { user } from "../../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), 
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
      res.status(400).json({ error: "E-Mail bereits registriert" });
      return;
    }

    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const returnedUser = await db.insert(user).values([{
      email,
      password: passwordHash,
      leicht: 3,
      mittel: 5,
      schwer: 7,
      lernmethode: "difficulty"
    }]).returning();
    const token = jwt.sign({ id: returnedUser[0].id, email: returnedUser[0].email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json(token);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Registrierung fehlgeschlagen" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if ( !email || !password || typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: "E-Mail und Passwort sind erforderlich" });
    return;
  }
  try {
    const existingUser = await db.select().from(user).where(eq(user.email, email));
    if (existingUser.length === 0) {
      res.status(400).json({ error: "E-Mail nicht registriert" });
      return;
    }

    const isPasswordValid = await argon2.verify(existingUser[0].password, password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Falsches Passwort" });
      return;
    }

    const token = jwt.sign({ id: existingUser[0].id, email: existingUser[0].email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json(token);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

export default router;
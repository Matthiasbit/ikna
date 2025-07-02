import { Router, Request, Response } from "express";
import argon2 from "argon2";
import { db } from "../db";
import { user as userTable, set, card } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { getVerifiedToken } from "../utils/utility";

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
    const existingUser = await db.select().from(userTable).where(eq(userTable.email, email));
    if (existingUser.length > 0) {
      res.status(400).json({ error: "E-Mail bereits registriert" });
      return;
    }

    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    const returnedUser = await db.insert(userTable).values([{
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
    res.status(500).json({ error: "Registrierung fehlgeschlagen" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const loginBody = registrationSchema.safeParse(req.body);
  if (!loginBody.success) {
    res.status(400).json({ error: "Ungültige Eingabedaten", details: loginBody.error.errors });
    return;
  }
  if ( !loginBody.data.email || !loginBody.data.password) {
    res.status(400).json({ error: "E-Mail und Passwort sind erforderlich" });
    return;
  }
  try {
    const existingUser = await db.select().from(userTable).where(eq(userTable.email, loginBody.data.email));
    if (existingUser.length === 0) {
      res.status(400).json({ error: "E-Mail nicht registriert" });
      return;
    }

    const isPasswordValid = await argon2.verify(existingUser[0].password, loginBody.data.password);
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

router.delete("/user", async (req: Request, res: Response): Promise<void> => {
  const user = getVerifiedToken(req, res);
  if (!user) return;
  const sets = await db.delete(set).where(eq(set.user, user.id)).returning();

  sets.forEach((set) => {
    db.delete(card).where(eq(card.set, set.id));
  });

  db.delete(userTable).where(eq(userTable.id, user.id)).then(() => {
    res.status(200).json({ message: "User deleted successfully" });
  }).catch(error => {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  });

});

export default router;
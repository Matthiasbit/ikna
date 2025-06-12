import { Router, Request, Response} from "express";
import argon2 from "argon2";
import { db } from "../db";
import { userData } from "../db/schema";

const router = Router();

router.post("/registration", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "E-Mail und Passwort erforderlich" });
    return;
  }
  try {
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    await db.insert(userData).values([{ email, password: passwordHash }]);
    res.json({ message: "Registrierung erfolgreich" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Registrierung fehlgeschlagen" });
  }
});

export default router;

import { Router, Request, Response } from "express";
import argon2 from "argon2";
import { db } from "../db";
import { user as userTable } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1), 
});



router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const loginBody = loginSchema.safeParse(req.body);

  if (!loginBody.success) {
    res.status(400).json({ error: "Ungültige Eingabedaten", details: loginBody.error.errors });
    return;
  }
  
  try {
    const existingUser = await db.select().from(userTable).where(eq(userTable.email, loginBody.data.email));
    if (existingUser.length === 0) {
      res.status(400).json({ error: "E-Mail nicht registriert" });
      return;
    }

    if (!await argon2.verify(existingUser[0].password, loginBody.data.password)) {
    res.status(400).json({ error: "Falsches Passwort" });
    return;
  }

    res.status(200).json(
    jwt.sign(
      { id: existingUser[0].id, email: existingUser[0].email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )
  );
  
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});
export default router;
import { Router } from "express";
import { db } from "../db";
import { user as userTable, set , card} from "../db/schema";
import { eq } from "drizzle-orm";
import { getVerifiedToken } from "../utils/utility";
import z from "zod"; 
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { loginSchema } from "./login";

const router = Router();
const settingsSchema = z.object({
    easy: z.number().int().min(0),
    medium: z.number().int().min(0),
    hard: z.number().int().min(0),
    lernmethode: z.string().min(1),
});


router.post("/user", async (req, res): Promise<void> => {
  const parseResult = loginSchema.safeParse(JSON.parse(String(req.body)));
  //const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Ungültige Eingabedaten", details: parseResult.error.errors });
    return;
  }
  try {
    const existingUser = await db.select().from(userTable).where(eq(userTable.email, parseResult.data.email));
    if (existingUser.length > 0) {
      res.status(400).json({ error: "E-Mail bereits registriert" });
      return;
    }

    const passwordHash = await argon2.hash(parseResult.data.password, { type: argon2.argon2id });
    const returnedUser = await db.insert(userTable).values([{
      email: parseResult.data.email,
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

router.get("/user", (req, res) => {
    const user = getVerifiedToken(req, res);
    if (!user) {return;}
    db.select().from(userTable).where(eq(userTable.id, user.id)).then((result) => {
        if (result.length > 0) {
            const userSettings = result[0];
            res.status(200).json({
                easy: userSettings.leicht,
                medium: userSettings.mittel,
                hard: userSettings.schwer,
                lernmethode: userSettings.lernmethode,
            });
        } else {
            res.status(404).json({ error: "User settings not found" });
        }
    }).catch(error => {
        console.error("Error fetching settings:", error);
        res.status(500).json({ error: "Internal server error" });
    });
});

router.put("/user", async (req, res): Promise<void> => {
    const user = getVerifiedToken(req, res);
    if (!user) {return;}
    const parseResult = settingsSchema.safeParse(JSON.parse(String(req.body)));
    // const parseResult = settingsSchema.safeParse(req.body);
    
    if (!parseResult.success) {
        res.status(400).json({ error: "Ungültige Daten", details: parseResult.error.errors });
        return;
    }
    const requestBody = parseResult.data;
    try {
        await db.update(userTable).set({ 
            leicht: requestBody.easy,
            mittel: requestBody.medium,
            schwer: requestBody.hard,
            lernmethode: requestBody.lernmethode,
        }).where(eq(userTable.id, user.id));
        res.status(200).send("Settings updated successfully");
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/user", async (req, res): Promise<void> => {
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
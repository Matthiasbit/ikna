import { Router } from "express";
import { db } from "../db";
import { user as userTable} from "../db/schema";
import { eq } from "drizzle-orm";
import { getVerifiedToken } from "../utils/utility";
import z from "zod"; 

const router = Router();

const settingsSchema = z.object({
    easy: z.number().int().min(0),
    medium: z.number().int().min(0),
    hard: z.number().int().min(0),
    lernmethode: z.string().min(1),
});

router.get("/Settings", (req, res) => {
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

router.post("/Settings", async (req, res): Promise<void> => {
    const user = getVerifiedToken(req, res);
    if (!user) {return;}
    const parseResult = settingsSchema.safeParse(req.body);
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
export default router;
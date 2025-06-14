import { Router } from "express";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

interface SettingsBody {
    easy: number;
    medium: number;
    hard: number;
    lernmethode: string;
    shareSets: boolean;
    shareStats: boolean;
}

router.post("/Settings", (req: { body: SettingsBody }, res) => {
    db.update(user).set({ 
        leicht: req.body.easy,
        mittel: req.body.medium,
        schwer: req.body.hard,
        lernmethode: req.body.lernmethode,
    }).where(eq(user.id, 2)).then(() => {
        res.status(200);
        res.send("Settings updated successfully");
    }).catch(error => {
        console.error("Error updating settings:", error);
        res.status(500).json({ error: "Internal server error" });
    });
});

export default router;
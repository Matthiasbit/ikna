import { Router } from "express";
import { db } from "../db";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

interface SettingsBody {
    easy: number;
    medium: number;
    hard: number;
    lernmethode: string;
    shareSets: boolean;
    shareStats: boolean;
}

router.get("/Settings", (req, res) => {
    let authorized = true;
    jwt.verify(req.headers.authorization?.split(" ")[1] || "", process.env.JWT_SECRET!, (err) => {
        if (err) {
            res.status(401).json({ error: "Unauthorized" });
            authorized = false;
            return;
        }
    });
    if (!authorized) {
        return;
    }
    const decode = jwt.decode(req.headers.authorization?.split(" ")[1] || "") as { id: number, email: string, iat: number, exp: number };
    db.select().from(user).where(eq(user.id, decode.id)).then((result) => {
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
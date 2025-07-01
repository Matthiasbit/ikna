import { Router } from "express";
import { db } from "../db";
import { user as userTable} from "../db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { getVerifiedToken } from "../utils/utility"; 

const router = Router();

type SettingsBody = {
    easy: number;
    medium: number;
    hard: number;
    lernmethode: string;
}

router.get("/Settings", (req, res) => {
    const user = getVerifiedToken(req, res);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    let decoded: { id: number };
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    db.select().from(userTable).where(eq(userTable.id, decoded.id)).then((result) => {
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

router.post("/Settings", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Kein Token mitgesendet" });
        return;
    }
    const token = authHeader.split(" ")[1];
    let decode: any;
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
        res.status(401).json({ error: "Token ungültig" });
        return;
    }
    const userId = decode.id;
    try {
        await db.update(userTable).set({ 
            leicht: req.body.easy,
            mittel: req.body.medium,
            schwer: req.body.hard,
            lernmethode: req.body.lernmethode,
        }).where(eq(userTable.id, userId)).execute();

        res.status(200).send("Settings updated successfully");
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
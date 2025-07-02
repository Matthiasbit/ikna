import {Request, Response, Router} from "express";
import {db} from "../db";
import {card, set, user as userTable} from "../db/schema";
import {and, eq} from "drizzle-orm";
import jwt from "jsonwebtoken";
import z from "zod";
import {getVerifiedToken, JwtPayload} from "../utils/utility";
const router = Router();


const updateSetSchema = z.object({
    name: z.string().optional(),
    kategorie: z.string().optional(),
});

router.get("/sets/:category",async (req, res) => {
    const user = getVerifiedToken(req, res);
    if (!user) return;

    const userData = await db.select().from(userTable).where(eq(userTable.id, user.id))
    if (userData.length === 0) {
        res.status(404).json({error: "User not found"});
        return;
    }
    const actualUser = {
        id: userData[0].id,
        leicht: userData[0].leicht,
        mittel: userData[0].mittel,
        schwer: userData[0].schwer,
        lernmethode: userData[0].lernmethode
    };
    let sets;
    if (req.params.category === "Alle") {
        sets = await db.select().from(set).where(eq(set.user, user.id));
    } else {
        sets = await db.select().from(set).where(and(eq(set.user, user.id), eq(set.kategorie, req.params.category)));
    }
    const setsWithStats = await Promise.all(
        sets.map(async item => {
            const cards = await db.select().from(card).where(eq(card.set, item.id));
            let zero = 0, twentyfive = 0, fifty = 0, seventyfive = 0, hundred = 0;
            cards.forEach(cardItem => {
                if (cardItem.status === 0) {
                    zero++;
                    return;
                }
                const percentage =
                    cardItem.difficulty === "leicht"
                        ? cardItem.status / actualUser.leicht
                        : cardItem.difficulty === "mittel"
                            ? cardItem.status / actualUser.mittel
                            : cardItem.status / actualUser.schwer;
                if (percentage <= 0.25) {
                    twentyfive++;
                } else if (percentage <= 0.5) {
                    fifty++;
                } else if (percentage <= 0.75) {
                    seventyfive++;
                } else {
                    hundred++;
                }
            });
            return {
                id: item.id,
                name: item.name,
                category: item.kategorie,
                zero, twentyfive, fifty, seventyfive, hundred
            };
        })
    );

    res.status(200).json(setsWithStats);
});

router.get("/set/:id", async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization?.split(" ")[1] || "";

    let decoded: JwtPayload;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as typeof decoded;
    } catch (err) {
        console.error("JWT Fehler oder DB Fehler:", err);
        res.status(401).json({error: "Unauthorized"});
        return;
    }

    const setId = Number(req.params.id);
    if (isNaN(setId)) {
        res.status(404).json({error: "Set nicht gefunden"});
        return;
    }

    try {
        const setsFound = await db.select().from(set).where(
            and(eq(set.id, setId), eq(set.user, decoded.id))
        );

        if (setsFound.length === 0) {
            res.status(404).json({error: "Set nicht gefunden"});
            return;
        }

        res.status(200).json(setsFound[0]);
    } catch (error) {
        console.error("Fehler beim Abrufen des Sets: ", error);
        res.status(500).json({error: "Interner Serverfehler"});
    }
});

// create new Set
router.post("/set", async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1] || "";

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const parseResult = updateSetSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
            return;
        }

        if (!parseResult.data.name) {
            res.status(400).json({error: "Name ist erforderlich"});
            return;
        }

        const {name, kategorie} = parseResult.data;

        const insertedSet = await db.insert(set).values({
            name,
            kategorie: kategorie ?? "",
            user: decoded.id
        }).returning();

        console.log(insertedSet[0])

        res.status(201).json(insertedSet[0]);
    } catch (err) {
        console.error("Fehler beim Erstellen:", err);
        if (!res.headersSent) {
            res.status(500).json({error: "Set konnte nicht erstellt werden"});
        }
    }
});

// update set by id
router.put("/set/:id", async (req: Request, res: Response): Promise<void> => {
    const user = getVerifiedToken(req, res);
    if (!user) return;

    const id = req.params.id;

    const parseResult = updateSetSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
        return;
    }

    const updateData = parseResult.data;

    try {
        await db.update(set)
            .set(updateData)
            .where(eq(set.id, Number(id)));

        res.json({message: "Set aktualisiert"});
    } catch (err) {
        console.error("Update-Fehler:", err);
        res.status(500).json({error: "Fehler beim Aktualisieren"});
    }
});

// delete set by id
router.delete("/set/:id", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if (!user) return;

    const setId = Number(req.params.id);

    if (isNaN(setId)) {
        res.status(400).json({error: "Ungültige setId"});
        return;
    }

    try {
        await db.delete(card).where(eq(card.set, setId));

        await db.delete(set).where(eq(set.id, Number(setId)));

        res.json({message: "Set gelöscht"});
    } catch (err) {
        console.error("Löschfehler:", err);
        res.status(500).json({error: "Fehler beim Löschen"});
    }
});


router.get("/autocompleteOptions",async (req, res): Promise<void> => {
    const user = getVerifiedToken(req, res);
    if (!user) return;
    const sets = await db.select().from(set).where(eq(set.user, user.id));
    const categorys = sets.map(setItem => setItem.kategorie).filter(category => category !== null && category !== "");
    res.status(200).json(categorys);
});


export default router;
import {Router, Request, Response} from "express";
import {db} from "../db";
import {set, card, user} from "../db/schema";
import {eq} from "drizzle-orm";
import jwt from "jsonwebtoken";
import z from "zod";

const router = Router();


const updateSetSchema = z.object({
    name: z.string().optional(),
    kategorie: z.string().optional(),
});


router.get("/Sets", (req, res) => {
    let authorized = true;
    jwt.verify(req.headers.authorization?.split(" ")[1] || "", process.env.JWT_SECRET!, (err) => {
        if (err) {
            res.status(401).json({error: "Unauthorized"});
            authorized = false;
            return;
        }
    });
    if (!authorized) {
        return;
    }
    const decode = jwt.decode(req.headers.authorization?.split(" ")[1] || "") as {
        id: number,
        email: string,
        iat: number,
        exp: number
    };
    db.select().from(user).where(eq(user.id, decode.id))
        .then(userData => {
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
            return db.select().from(set).where(eq(set.user, decode.id)).then(data => {
                return Promise.all(
                    data.map(item =>
                        db.select().from(card).where(eq(card.set, item.id)).then(cards => {
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
                    )
                );
            });
        })
        .then(sets => res.status(200).json(sets))
        .catch(error => {
            console.error("Error fetching sets:", error);
            res.status(500).json({error: "Datenbank Fehler"});
        });
});

// get one set by id
router.get("/set/:id", async (req: Request, res: Response): Promise<void> => {

    const token = req.headers.authorization?.split(" ")[1] || "";

    let decoded: { id: number; email: string; iat: number; exp: number };

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
        const setsFound = await db.select().from(set).where(eq(set.id, setId));
        if (setsFound.length === 0) {
            res.status(404).json({error: "Set nicht gefunden"});
            return;
        }
        const fetchedSet = setsFound[0];

        if (fetchedSet.user !== decoded.id) {
            res.status(403).json({error: "Kein Zugriff auf dieses Set"});
            return;
        }
        res.status(200).json(fetchedSet);
    } catch (error){
        console.log("Fehler beim Abrufen des Sets: ", error);
        res.status(500).json({error: "Interner Serverfehler"});
    }
});


/* let authorized = true;
 const {id} = req.params;
 jwt.verify(req.headers.authorization?.split(" ")[1] || "", process.env.JWT_SECRET!, (err) => {
     if (err) {
         res.status(401).json({error: "Unauthorized"});
         authorized = false;
         return;
     }
 });
 if (!authorized) {
     return;
 }
 const decode = jwt.decode(req.headers.authorization?.split(" ")[1] || "") as {
     id: number,
     email: string,
     iat: number,
     exp: number
 };

 const setsFound = await db.select().from(set).where(eq(set.id, Number(req.params.id)));


 */

/*

    try {
        const setsFound = await db.select().from(set).where(eq(set.id, Number(id)));

        if (setsFound.length === 0) {
            res.status(404).json({error: "Set nicht gefunden"});
        }

        res.status(200).json(setsFound[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Interner Fehler"});
    }
});
 */

// create new Set
router.post("/set", async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1] || "";

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

        const parseResult = updateSetSchema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
            return;
        }

        if (!parseResult.data.name) {
            res.status(400).json({error: "Name ist erforderlich"});
        }

        const {name, kategorie} = parseResult.data;

        const inserted = await db.insert(set).values({
            name,
            kategorie: kategorie ?? "",
            user: decoded.id
        }).returning();

        res.status(201).json({message: "Set erstellt", set: inserted[0]});
    } catch (err) {
        console.error("Fehler beim Erstellen:", err);
        res.status(500).json({error: "Set konnte nicht erstellt werden"});
    }
});

// update set by id
router.put("/set/:id", async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    const parseResult = updateSetSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
        return;
    }

    const updateData = parseResult.data;

    try {
        const updated = await db.update(set)
            .set(updateData)
            .where(eq(set.id, Number(id)))
            .returning();

        if (updated.length === 0) {
            res.status(404).json({error: "Set nicht gefunden"});
        }

        res.json({message: "Set aktualisiert", set: updated[0]});
    } catch (err) {
        console.error("Update-Fehler:", err);
        res.status(500).json({error: "Fehler beim Aktualisieren"});
    }
});

// delete set by id
router.delete("/set/:id", async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    try {
        const deleted = await db.delete(set).where(eq(set.id, Number(id))).returning();

        if (deleted.length === 0) {
            res.status(404).json({error: "Set nicht gefunden"});
        }

        res.json({message: "Set gelöscht"});
    } catch (err) {
        console.error("Löschfehler:", err);
        res.status(500).json({error: "Fehler beim Löschen"});
    }
});


export default router;
import {Request, Response, Router} from "express";
import {db} from "../db";
import {card, set, user as userTable} from "../db/schema";
import {and, eq} from "drizzle-orm";
import z from "zod";
import {leitnerSpacedRepetition, sortByDifficulty, randomLearningMode} from "../utils/learningStrategies";
import {getVerifiedToken} from "../utils/utility";

const router = Router();

const updateCardSchema = z.object({
    set: z.number(),
    question: z.string(),
    answer: z.string(),
    status: z.number().optional(),
    difficulty: z.string().optional(),
    lastreview: z.string().optional(),
});

router.get("/cards/:setId", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if (!user) return;
    console.log(req.params.setId);
    const setId = Number(req.params.setId);
    if (isNaN(setId)) {
        res.status(400).json({error: "Ungültige SetId"});
        return;
    }

    try {
        const userObject = await db.select().from(userTable).where(eq(userTable.id, user.id)).limit(1);
        if (!userObject[0]) {
            res.status(404).json({error: "User nicht gefunden"});
            return;
        }

        const rawCards = await db
            .select({
                id: card.id,
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
                status: card.status,
                lastreview: card.lastreview,
                set: card.set
            })
            .from(card)
            .innerJoin(set, eq(card.set, set.id))
            .where(
                and(
                    eq(card.set, setId),
                    eq(set.user, user.id)
                )
            );

        const cards = rawCards.map(c => ({
            ...c,
            set: c.set ?? 0,
            question: c.question ?? "",
            answer: c.answer ?? "",
            status: c.status ?? 0,
            difficulty: c.difficulty ?? "leicht",
            lastreview: c.lastreview ?? "",
        }));

        const userIntervals = {
            leicht: userObject[0].leicht,
            mittel: userObject[0].mittel,
            schwer: userObject[0].schwer,
        };

        const lernmethode = userObject[0].lernmethode;

        let sortedCards;
        if (lernmethode === "leitner") {
            sortedCards = leitnerSpacedRepetition(cards, userIntervals);
        } else if (lernmethode === "difficulty") {
            sortedCards = sortByDifficulty(cards, userIntervals);
        } else if (lernmethode === "random") {
            sortedCards = randomLearningMode(cards, userIntervals);
        } else {
            sortedCards = cards;
        }
        res.json(sortedCards);
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Fehler beim Laden der Karten"});
    }
});

router.get("/card/:id", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if(!user) return ;

    const id = req.params.id;

    try {
        const cards = await db.select().from(card).where(eq(card.id, Number(id)));
        if (!cards.length) {
            res.status(404).json({error: "Karte nicht gefunden"});
            return;
        }

        res.status(200).json(cards[0]);
    } catch (e) {
        console.error("Fehler beim Abrufen der Karte:", e);
        res.status(500).json({error: "Fehler beim Abrufen der Karte"});
    }
});

router.put("/card/:id", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if(!user) return ;

    const id = req.params.id;
    const parseResult = updateCardSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
        return;
    }

    const updateData = parseResult.data;

    try {
        const updated = await db
            .update(card)
            .set(updateData)
            .where(eq(card.id, Number(id)))
            .execute();

        if (!updated || (Array.isArray(updated) && updated.length === 0)) {
            res.status(404).json({error: "Karte nicht gefunden"});
            return;
        }

        res.json({message: "Karte erfolgreich aktualisiert"});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Fehler beim Aktualisieren der Karte"});
    }
});

// create a new card with POST
router.post("/card", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if(!user) return ;

    const parseResult = updateCardSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({error: "Ungültige Eingabedaten", details: parseResult.error.errors});
        return;
    }

    const newCard = {
        ...parseResult.data,
        status: parseResult.data.status ?? 0,
    };

    try {
        const [insertedCard] = await db.insert(card).values(newCard).returning();
        res.status(201).json({message: "Karte erfolgreich erstellt", card: insertedCard});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Fehler beim Erstellen der Karte"});
    }
});

// delete card by id
router.delete("/card/:id", async (req: Request, res: Response): Promise<void> => {

    const user = getVerifiedToken(req, res);
    if(!user) return ;

    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({error: "Ungültige Karten Id"});
        return;
    }

    try {
        const deleted = await db.delete(card).where(eq(card.id, Number(id)));

        if (!deleted) {
            res.status(404).json({error: "Karte nicht gefunden"});
            return;
        }
        res.json({message: "Karte erfolgreich gelöscht"});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Fehler beim Löschen der Karte"});
    }
});

export default router;
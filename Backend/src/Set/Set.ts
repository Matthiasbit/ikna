import { Router } from "express";
import { db } from "../db";
import { set, card, user } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/Sets", (req, res) => {
    db.select().from(user).where(eq(user.id, 1))
        .then(userData => {
            if (userData.length === 0) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            const actualUser = {
                id: userData[0].id,
                leicht: userData[0].leicht,
                mittel: userData[0].mittel,
                schwer: userData[0].schwer,
                lernmethode: userData[0].lernmethode
            };
            return db.select().from(set).then(data => {
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
            res.status(500).json({ error: "Datenbank Fehler" });
        });
});

export default router;
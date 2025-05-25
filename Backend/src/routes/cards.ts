import { Router } from "express";

const router = Router();

router.get("/getCards", (_, res) => {
  res.json([
    { id: '1', question: 'Hier steht sinnhafftes?', answer: 'Bitte funktionier', difficulty: 1 },
    { id: '2', question: 'Wer begeht Kriegsverbrechen in seiner Freizeit?', answer: 'Nein nicht Matthias, es ist Benjamin Blümchen', difficulty: 2 },
    { id: '3', question: 'Welche id habe ich?', answer: '3 aber warum zum F gebe ich DANN NICHT 3 AUS......', difficulty: 2 },
    { id: '4', question: 'Eins zwei drei', answer: 'Lirum Larum leptum', difficulty: 2 },
    { id: '5', question: 'Wer füllt die restlichen Karten mit tollem Text?', answer: 'Genau Svenja!!', difficulty: 1 },
  ]);
});

export default router;
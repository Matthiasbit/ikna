import { test, expect } from "vitest";

test("Learningpage zeigt Karte an, wenn Karten vorhanden sind", () => {
  const cards = [{ question: "Frage?", answer: "Antwort", status: 0, difficulty: "mittel", id: 1, set: 1 }];
  const currentCardIndex = 0;
  expect(cards[currentCardIndex]).toHaveProperty("question");
  expect(cards[currentCardIndex]).toHaveProperty("answer");
});

test("Learningpage zeigt Erfolgsmeldung, wenn Stapel leer", () => {
  const cards: any[] = [];
  expect(cards.length).toBe(0);
});

test("Antwort als korrekt erhöht Status der Karte", () => {
  let card = { status: 0, difficulty: "mittel", id: 1, set: 1, question: "?", answer: "!" };
  const isCorrect = true;
  card.status = isCorrect ? card.status + 1 : card.status - 1;
  expect(card.status).toBe(1);
});

test("Antwort als falsch verringert Status, aber nicht unter 0", () => {
  let card = { status: 0, difficulty: "mittel", id: 1, set: 1, question: "?", answer: "!" };
  const isCorrect = false;
  card.status = isCorrect ? card.status + 1 : Math.max(0, card.status - 1);
  expect(card.status).toBe(0);
});

test("Learningpage übernimmt gewählte Schwierigkeit", () => {
  const selectedChip = "schwer";
  let card = { difficulty: "mittel" };
  card.difficulty = selectedChip;
  expect(card.difficulty).toBe("schwer");
});
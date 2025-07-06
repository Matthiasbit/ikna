import { test, expect } from "vitest";
import { sortByDifficulty, leitnerSpacedRepetition, randomLearningMode } from "../src/utils/learningStrategies";

const userIntervals = { leicht: 1, mittel: 2, schwer: 3 };

const cards = [
  { id: 1, set: 1, question: "Q1", answer: "A1", status: 0, difficulty: "leicht" },
  { id: 2, set: 1, question: "Q2", answer: "A2", status: 1, difficulty: "mittel" },
  { id: 3, set: 1, question: "Q3", answer: "A3", status: 2, difficulty: "schwer" },
  { id: 4, set: 1, question: "Q4", answer: "A4", status: 0, difficulty: "schwer" },
];

test("sortByDifficulty sortiert Karten korrekt", () => {
  const sorted = sortByDifficulty(cards, userIntervals);
  expect(sorted[0].difficulty).toBe("schwer");
  expect(sorted[sorted.length - 1].difficulty).toBe("leicht");
});

test("randomLearningMode gibt alle gültigen Karten zurück", () => {
  const randomCards = randomLearningMode(cards, userIntervals);
  expect(randomCards.length).toBeGreaterThan(0);
  expect(randomCards.every(card => typeof card.question === "string")).toBe(true);
});

test("leitnerSpacedRepetition sortiert Karten korrekt", () => {
  const sorted = leitnerSpacedRepetition(cards, userIntervals);
  expect(sorted.some(card => card.difficulty === "schwer")).toBe(true);
});

test("Alle Karten durchlaufen: Nach Status-Erhöhung keine Karte mehr übrig", () => {
  const learnedCards = cards.map(card => ({
    ...card,
    status: userIntervals[card.difficulty as keyof typeof userIntervals],
  }));
  const filtered = sortByDifficulty(learnedCards, userIntervals);
  expect(filtered.length).toBe(0);
});


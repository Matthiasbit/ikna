import { test, expect, describe, beforeEach } from "vitest";
import { sortByDifficulty, leitnerSpacedRepetition, randomLearningMode } from "../src/utils/learningStrategies";

import type { UserIntervals } from "../src/utils/learningStrategies";
let userIntervals: UserIntervals;
let cards: any[];

beforeEach(() => {
  userIntervals = { leicht: 1, mittel: 2, schwer: 3 };
  cards = [
    { id: 1, set: 1, question: "Q1", answer: "A1", status: 0, difficulty: "leicht" },
    { id: 2, set: 1, question: "Q2", answer: "A2", status: 1, difficulty: "mittel" },
    { id: 3, set: 1, question: "Q3", answer: "A3", status: 2, difficulty: "schwer" },
    { id: 4, set: 1, question: "Q4", answer: "A4", status: 0, difficulty: "schwer" },
  ];
});

describe("sortByDifficulty", () => {
  test("sortiert Karten korrekt nach Schwierigkeit", () => {
    const sorted = sortByDifficulty(cards, userIntervals);
    expect(sorted[0].difficulty).toBe("schwer");
    expect(sorted[sorted.length - 1].difficulty).toBe("leicht");
  });

  test("gibt leeres Array bei leerem Input zurück", () => {
    expect(sortByDifficulty([], userIntervals)).toEqual([]);
  });

  test("ignoriert Karten mit ungültigen Feldern", () => {
    const invalidCards = [
      { id: 5, set: 1, question: null, answer: "A", status: 0, difficulty: "leicht" } as any,
      { id: 6, set: 1, question: "Q", answer: "A", status: "0", difficulty: "leicht" } as any,
    ];
    expect(sortByDifficulty(invalidCards, userIntervals)).toEqual([]);
  });

  test("behandelt Karten mit unbekannter Schwierigkeit", () => {
    const unknown = [
      { id: 7, set: 1, question: "Q", answer: "A", status: 0, difficulty: "unbekannt" },
    ];
    const sorted = sortByDifficulty(unknown, userIntervals);
    expect(sorted.length).toBe(1);
  });

  test("gibt keine Karten zurück, wenn alle gelernt sind", () => {
    const learnedCards = cards.map(card => ({
      ...card,
      status: userIntervals[card.difficulty as keyof typeof userIntervals],
    }));
    const filtered = sortByDifficulty(learnedCards, userIntervals);
    expect(filtered.length).toBe(0);
  });
});

describe("randomLearningMode", () => {
  test("gibt alle gültigen Karten zurück", () => {
    const randomCards = randomLearningMode(cards, userIntervals);
    expect(randomCards.length).toBeGreaterThan(0);
    expect(randomCards.every(card => typeof card.question === "string")).toBe(true);
  });

  test("gibt unterschiedliche Reihenfolgen zurück", () => {
    const results = Array.from({ length: 5 }, () => randomLearningMode(cards, userIntervals).map(c => c.id).join(","));
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBeGreaterThan(1);
  });

  test("gibt leeres Array bei leerem Input zurück", () => {
    expect(randomLearningMode([], userIntervals)).toEqual([]);
  });
});

describe("leitnerSpacedRepetition", () => {
  test("sortiert Karten korrekt", () => {
    const sorted = leitnerSpacedRepetition(cards, userIntervals);
    expect(sorted.some(card => card.difficulty === "schwer")).toBe(true);
  });

  test("gibt leeres Array bei leerem Input zurück", () => {
    expect(leitnerSpacedRepetition([], userIntervals)).toEqual([]);
  });

  test("sortiert nach lastreview (älteste zuerst)", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const cardsWithReview = [
      { id: 1, set: 1, question: "Q1", answer: "A1", status: 0, difficulty: "leicht", lastreview: now.toISOString() },
      { id: 2, set: 1, question: "Q2", answer: "A2", status: 0, difficulty: "leicht", lastreview: yesterday },
    ];
    const sorted = leitnerSpacedRepetition(cardsWithReview, userIntervals);
    expect(sorted[0].id).toBe(2);
  });
});

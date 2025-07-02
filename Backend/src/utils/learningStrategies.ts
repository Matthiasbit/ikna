type Card = {
  id: number;
  set: number; 
  question: string;
  answer: string;
  status: number; 
  difficulty: string;
  lastReviewed?: string; 
}

type UserIntervals ={
  leicht: number; 
  mittel: number; 
  schwer: number; 
}

//Hilfsfunktionen
function isCardCompleted(card: Card, userIntervals: UserIntervals): boolean {
  const difficulty = card.difficulty.toLowerCase();
  const requiredRepeats = userIntervals[difficulty as keyof UserIntervals] ?? 1;
  return card.status >= requiredRepeats;
}

function difficultyToValue(difficulty: string, userIntervals: UserIntervals): number {
  switch (difficulty.toLowerCase()) {
    case "schwer": return userIntervals.schwer;
    case "mittel": return userIntervals.mittel;
    case "leicht": return userIntervals.leicht;
    default: return 5;
  }
}

function filterValidCards(cards: Card[], userIntervals: UserIntervals): Card[] {
  return cards.filter(
    card =>
      card &&
      typeof card.status === "number" &&
      typeof card.difficulty === "string" &&
      typeof card.question === "string" &&
      typeof card.answer === "string" &&
      !isCardCompleted(card, userIntervals)
  );
}

// Fisher-Yates Shuffle
function randomLearningMode(cards: Card[], userIntervals: UserIntervals): Card[] {
  const filtered = filterValidCards(cards, userIntervals);
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered;
}

// Sortiert Karten: schwer > mittel > leicht
function sortByDifficulty(cards: Card[], userIntervals: UserIntervals): Card[] {
  const filtered = filterValidCards(cards, userIntervals);
  return [...filtered].sort(
    (cardA, cardB) => difficultyToValue(cardB.difficulty, userIntervals) - difficultyToValue(cardA.difficulty, userIntervals)
  );
}

// Leitner-System: Karten werden nach Fälligkeit (basierend auf Box und User-Intervallen) sortiert
function getNextReviewDate(
  status: number,
  lastReviewed: string | undefined,
  difficulty: string,
  userIntervals: UserIntervals
): Date {
  const intervals = {
    leicht: userIntervals.leicht,
    mittel: userIntervals.mittel,
    schwer: userIntervals.schwer,
  };
  const interval = intervals[difficulty.toLowerCase() as keyof UserIntervals] ?? 1;
  const last = lastReviewed ? new Date(lastReviewed) : new Date();
  const next = new Date(last);
  next.setDate(last.getDate() + interval * (status || 1));
  return next;
}

function leitnerSpacedRepetition(cards: Card[], userIntervals: UserIntervals): Card[] {
  const filtered = filterValidCards(cards, userIntervals);
  const today = new Date();

  return [...filtered].sort((cardA, cardB) => {
    const cardANext = getNextReviewDate(cardA.status, cardA.lastReviewed, cardA.difficulty, userIntervals);
    const cardBNext = getNextReviewDate(cardB.status, cardB.lastReviewed, cardB.difficulty, userIntervals);

    const cardADue = cardANext <= today ? 0 : 1;
    const cardBDue = cardBNext <= today ? 0 : 1;
    if (cardADue !== cardBDue) {
      return cardADue - cardBDue;
    }

    if (cardA.status !== cardB.status) {
      return cardA.status - cardB.status;
    }

    return difficultyToValue(cardB.difficulty, userIntervals) - difficultyToValue(cardA.difficulty, userIntervals);
  });
}


export { sortByDifficulty, leitnerSpacedRepetition, randomLearningMode };

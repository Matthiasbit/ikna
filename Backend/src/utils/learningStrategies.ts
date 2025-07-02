interface Card {
  id: number;
  set: number; 
  question: string;
  answer: string;
  status: number; 
  difficulty: string;
  lastReviewed?: string; 
}

interface UserIntervals {
  leicht: number; 
  mittel: number; 
  schwer: number; 
}

// Sortiert Karten: schwer > mittel > leicht
function sortByDifficulty(cards: Card[], userIntervals: UserIntervals): Card[] {
    const filtered = cards.filter(
    card =>
      card &&
      typeof card.status === "number" &&
      typeof card.difficulty === "string" &&
      typeof card.question === "string" &&
      typeof card.answer === "string" &&
      card.status < 10
  );
  function difficultyToWeight(difficulty: string): number {
    switch (difficulty.toLowerCase()) {
      case "schwer": return userIntervals.schwer;
      case "mittel": return userIntervals.mittel;
      case "leicht": return userIntervals.leicht;
      default: return 5;
    }
  }

  return [...filtered].sort(
    (a, b) => difficultyToWeight(b.difficulty) - difficultyToWeight(a.difficulty)
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
  const filtered = cards.filter(
    card =>
      card &&
      typeof card.status === "number" &&
      typeof card.difficulty === "string" &&
      typeof card.question === "string" &&
      typeof card.answer === "string" &&
      card.status < 10
  );

  const today = new Date();

  return [...filtered].sort((a, b) => {
    const aNext = getNextReviewDate(a.status, a.lastReviewed, a.difficulty, userIntervals);
    const bNext = getNextReviewDate(b.status, b.lastReviewed, b.difficulty, userIntervals);

    const aDue = aNext <= today ? 0 : 1;
    const bDue = bNext <= today ? 0 : 1;
    if (aDue !== bDue) {
      return aDue - bDue;
    }

    if (a.status !== b.status) {
      return a.status - b.status;
    }

    function difficultyToNumber(difficulty: string): number {
      switch (difficulty.toLowerCase()) {
        case "schwer": return userIntervals.schwer;
        case "mittel": return userIntervals.mittel;
        case "leicht": return userIntervals.leicht;
        default: return 5;
      }
    }
    return difficultyToNumber(b.difficulty) - difficultyToNumber(a.difficulty);
  });
}

export { sortByDifficulty, leitnerSpacedRepetition };

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
function sortByDifficulty(cards: Card[]): Card[] {
  function difficultyToNumber(difficulty: string): number {
    switch (difficulty.toLowerCase()) {
      case "schwer": return 3;
      case "mittel": return 2;
      case "leicht": return 1;
      default: return 0;
    }
  }

  return [...cards].sort(
    (a, b) => difficultyToNumber(b.difficulty) - difficultyToNumber(a.difficulty)
  );
}

// Leitner-System: Karten werden nach Fälligkeit (basierend auf Box) sortiert(Spaced Repetition)
function getNextReviewDate(status: number, lastReviewed: string | undefined): Date {
  const intervals = [0, 1, 3, 7, 14, 30];
  const interval = intervals[status] ?? 30;
  const last = lastReviewed ? new Date(lastReviewed) : new Date();
  const next = new Date(last);
  next.setDate(last.getDate() + interval);
  return next;
}

function leitnerSpacedRepetition(cards: Card[]): Card[] {
  const today = new Date();

  return [...cards].sort((a, b) => {
    const aNext = getNextReviewDate(a.status, a.lastReviewed);
    const bNext = getNextReviewDate(b.status, b.lastReviewed);

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
        case "schwer": return 3;
        case "mittel": return 2;
        case "leicht": return 1;
        default: return 0;
      }
    }
    return difficultyToNumber(b.difficulty) - difficultyToNumber(a.difficulty);
  });
}

export { sortByDifficulty, leitnerSpacedRepetition };

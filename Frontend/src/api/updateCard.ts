const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardUpdate {
  id: number;
  set?: number;
  question?: string;
  answer?: string;
  status?: number;
  difficulty?: string | null;
  lastreview?: string;
}

async function updateCard(card: CardUpdate) {
  try {
    const response = await fetch(`${API_BASE_URL}/card/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    if (!response.ok) {
      throw new Error("Fehlerhafte Antwort vom Server beim Aktualisieren der Karte");
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Karte:", error);
  }
}
export default updateCard;

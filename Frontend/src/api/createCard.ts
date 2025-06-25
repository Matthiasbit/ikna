
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardCreate {
    id: number;
    set?: number;
    question?: string;
    answer?: string;
    status?: number;
    difficulty?: string | null;
    lastreview?: string;
}

async function createCard (card: CardCreate) {
    try {
        const response = await fetch(`${API_BASE_URL}/createCard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card),
        });
        if (!response.ok) {
            throw new Error("Fehlerhafte Antwort vom Server beim Aktualisieren der Karte");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Karte:", error);
        throw error;
    }
}
export default createCard;
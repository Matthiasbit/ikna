const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardData {
    id: number;
    set: number;
    question: string;
    answer: string;
    status: number;
    difficulty: "leicht" | "mittel" | "schwer";
    lastreview: string;
}

export async function getCard(cardId: number): Promise<CardData | undefined> {

    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }

    const response = await fetch(`${API_BASE_URL}/card/${cardId}`, {
        headers: {Authorization: `Bearer ${token}`}
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error || "Fehler beim Abrufen der Karte");
    }

    const data = await response.json();
    return data;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type CardData = {
    id: number;
    set: number;
    question: string;
    answer: string;
    status: number;
    difficulty: "leicht" | "mittel" | "schwer";
    lastreview: string;
};
export async function getCard(cardId: number): Promise<CardData | undefined> {

    try {
        const response = await fetch(`${API_BASE_URL}/card/${cardId}`, {
            headers: {Authorization: `Bearer ${sessionStorage.getItem('token')}`}
        });

        if (response.status === 401) {
            window.location.href = "loginpage";
            return;
        }
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error?.error || "Fehler beim Abrufen der Karte");
        }
        return await response.json();
    } catch (err) {
        console.error("Fehler beim Abrufen der Karte:", err);
    }
}

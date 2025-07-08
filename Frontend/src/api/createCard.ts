const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardCreate {
    question: string;
    answer: string;
    difficulty?: string | null;
    setId: number;
}

async function createCard(card: CardCreate): Promise<{ card: { id: number } } | undefined> {

    try {
        const {setId, difficulty} = card;
        const payload = {
            set: setId,
            question: card.question || "Neue Frage hier",
            answer: card.answer || "Neue Antwort hier",
            difficulty: difficulty ?? "mittel",
        };

        const response = await fetch(`${API_BASE_URL}/card`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify(payload),
        });

        const contentType = response.headers.get("content-type");
        if (response.status === 401) {
            window.location.href = "loginpage";
            return;
        }
        if (!response.ok) {
            const errorBody = contentType?.includes("application/json")
                ? await response.json()
                : await response.text();
            throw new Error("Fehlerhafte Antwort vom Server beim Erstellen der Karte", errorBody);
        }

        return await response.json();

    } catch (error) {
        console.error("Fehler beim Aktualisieren der Karte:", error);
    }
}

export default createCard;
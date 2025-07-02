const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardUpdate {
    id: number;
    set: number;
    question: string;
    answer: string;
    status?: number;
    difficulty?: string;
    lastreview?: string;
}

async function updateCard(card: CardUpdate): Promise<void> {

    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }

    try {
        const {id, ...rest} = card;
        const payload = {
            ...rest, difficulty: rest.difficulty ?? "mittel",
        }

        const response = await fetch(`${API_BASE_URL}/card/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 401) {
            window.location.href = "/ikna/loginpage";
            return;
        }

        if (!response.ok) {
            if (response.status === 401) {
              window.location.href = 'ikna/loginpage';
            }
            throw new Error("Fehlerhafte Antwort vom Server beim Aktualisieren der Karte");
        }
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Karte:", error);
    }
}

export default updateCard;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function deleteCard(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/card/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Fehlerhafte Antwort vom Server beim Löschen der Karte");
        }

        await response.json();

    } catch (error) {
        console.error("Fehler beim Löschen der Karte:", error);
        throw error;
    }
}

export default deleteCard;

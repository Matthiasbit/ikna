const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CardCreate {
    question: string;
    answer: string;
    difficulty?: string | null;
    setId: number;
}

async function createCard(card: CardCreate) {
    try {
        const {setId, ...rest} = card;
        const payload = {...rest, set: setId,};

        const response = await fetch(`${API_BASE_URL}/createCard`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            const errorBody = contentType?.includes("application/json")
                ? await response.json()
                : await response.text(); // Fallback für HTML/Text

            console.error("❌ Fehler vom Server:", errorBody);
            throw new Error("Fehlerhafte Antwort vom Server beim Erstellen der Karte");
        }
        /* if (!response.ok) {
             const error = await response.json();
             console.error("❌ Fehler vom Server:", error);
             throw new Error("Fehlerhafte Antwort vom Server beim Aktualisieren der Karte");
         }

         */
        if (contentType?.includes("application/json")) {
            return await response.json();
        } else {
            console.warn("⚠️ Unerwarteter Inhaltstyp:", await response.text());
            return null;
        }
        
       /* const data = await response.json();
        return data;

        */
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Karte:", error);
        throw error;
    }
}

export default createCard;
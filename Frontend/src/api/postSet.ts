import {Sets} from "@/api/getSets";

export async function updateSet(setId: number, payload: { name?: string; kategorie?: string }, token: string) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/set/${setId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody?.error || "Fehler beim Aktualisieren des Sets");
    }

    return response.json(); // enthält: { message, set }
}



export async function createSet(token: string): Promise<Sets> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    //
    const payload = { name: "Neues Set", kategorie: "" }; // oder wie auch immer du default übergibst

    console.log("→ POST to", `${API_BASE_URL}/set`);
    console.log("→ Payload:", payload);
    console.log("→ Token:", token);
    //

    const response = await fetch(`${API_BASE_URL}/set`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: "Neues Set", kategorie: "" }) // leeres Set anlegen
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Fehler beim Erstellen des Sets");
    }

    const data = await response.json();
    return data.set;
}

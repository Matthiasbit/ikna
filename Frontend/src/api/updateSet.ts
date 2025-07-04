const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updateSet(setId: number, payload: { name?: string; kategorie?: string }) {

    const response = await fetch(`${API_BASE_URL}/set/${setId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
    });

    if (response.status === 401) {
        window.location.href = "ikna/loginpage";
        return;
    }
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody?.error || "Fehler beim Aktualisieren des Sets");
    }

    return response.json();
}

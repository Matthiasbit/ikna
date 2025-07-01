const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updateSet(setId: number, payload: { name?: string; kategorie?: string }) {


    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }


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

    return response.json();
}

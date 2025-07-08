const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function deleteSet(setId: number): Promise<void> {

    const response = await fetch(`${API_BASE_URL}/set/${setId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
    });

    if (response.status === 401) {
        window.location.href = "loginpage";
        return;
    }

    if (!response.ok) {
        throw new Error("Fehler beim Löschen des Sets");
    }

    window.location.reload();

}

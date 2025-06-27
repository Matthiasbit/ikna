export async function deleteSet(id: number, token: string): Promise<void> {
    const response = await fetch(`http://localhost:80/set/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Fehler beim Löschen des Sets");
    }
}

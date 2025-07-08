export async function deleteSet(setId: number): Promise<void> {

    const response = await fetch(`http://localhost:80/set/${setId}`, {
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

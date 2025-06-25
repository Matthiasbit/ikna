export async function deleteSet(setId: number): Promise<void> {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }
    ;

    const response = await fetch(`http://localhost:80/set/${setId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Fehler beim Löschen des Sets");
    }

    window.location.reload();

}

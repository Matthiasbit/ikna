const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function deleteUser(): Promise<void> {

    const response = await fetch(`${API_BASE_URL}/user`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
    });

    if (response.status == 401) {
        window.location.href = "ikna/loginpage";
        return;
    }

    if (!response.ok) {
        throw new Error("Fehler beim Löschen des Sets");
    }

    window.location.reload();

}

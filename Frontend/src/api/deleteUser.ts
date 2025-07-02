const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function deleteUser(): Promise<void> {
    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }
    ;

    const response = await fetch(`${API_BASE_URL}/user`, {
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

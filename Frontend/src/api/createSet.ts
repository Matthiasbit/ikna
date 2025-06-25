import {Sets} from "@/api/getSets";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createSet(): Promise<Sets | undefined> {

    const token = sessionStorage.getItem("token");
    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }

    const response = await fetch(`${API_BASE_URL}/set`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: "Neues Set", kategorie: ""}),
    });

    if (response.status === 401) {
        window.location.href = "/ikna/loginpage";
        return;
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Fehler beim Erstellen des Sets");
    }
    return await response.json();
}

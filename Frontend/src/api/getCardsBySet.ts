import {jwtDecode} from "jwt-decode";

type DecodedToken = {
    id: number;
    email: string;
    exp: number;
};

export function getUserIdFromToken(): number | null {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.id;
    } catch (err) {
        console.error("Fehler beim Dekodieren des Tokens:", err);
        return null;
    }
}

export async function getCardsBySetId(setId: number) {
    const token = sessionStorage.getItem("token");
    const userId = getUserIdFromToken();

    if (!token || !userId) {
        throw new Error("Token oder User-ID fehlt – bitte neu einloggen.");
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/getCards?setId=${setId}&userId=${userId}`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Fehler beim Laden der Karten: ${res.status} – ${errorText}`);
    }

    return await res.json();
}

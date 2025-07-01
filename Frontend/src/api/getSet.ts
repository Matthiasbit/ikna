import {Sets} from "./getSets"


function getSet(setId: number): Promise<Sets> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    return fetch(`${API_BASE_URL}/set/${setId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    })
        .then((res) => {
            if (!res.ok) {

                return res.json().then((errorBody) => {
                    throw new Error(errorBody?.error || "Unbekannter Fehler beim Laden des Sets");

                });
            }
            return res.json();
        })
}

export default getSet;
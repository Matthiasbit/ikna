import {useCallback, useEffect, useState} from "react";
import {Cards} from "@/pages/learningpage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCardsBySetId(setId: number) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        window.location.href = "/ikna/loginpage";
        return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cards/${setId}`;
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


export function useGetCards(setId: number) {
    const [cards, setCards] = useState<Cards[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCards = useCallback(() => {
        setLoading(true);
        const token = sessionStorage.getItem('token');
        fetch(`${API_BASE_URL}/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || ""}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = 'ikna/loginpage';
                    }
                    throw new Error('Fehlerhafte Antwort vom Server');
                }
                return response.json();

            })
            .then(data => {
                setCards(data);
            })
            .catch(error => {
                console.error('Fehler beim Laden der Karten:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

    return {cards, loading, error, refetch: fetchCards};
}

export default useGetCards;
import {useCallback, useEffect, useState} from "react";

export interface Cards {
    id: number;
    set: number;
    question: string;
    answer: string;
    status?: number;
    difficulty?: string;
    lastreview?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useGetCards(setId: number) {
    const [cards, setCards] = useState<Cards[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCards = useCallback(() => {
        if (isNaN(setId) || setId <= 0) {
            return;
        }
        setLoading(true);
        const token = sessionStorage.getItem('token');
        fetch(`${API_BASE_URL}/cards/${setId}`, {
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
                setLoading(false);
            })
            .catch(error => {
                console.error('Fehler beim Laden der Karten:', error);

            })
    }, [setId]);

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);

    return {cards, loading, refetch: fetchCards};
}

export default useGetCards;
import { useEffect, useState, useCallback } from "react";
import { Cards } from "@/pages/learningpage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useGetCards() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [loading, setLoading] = useState(false);

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

  return { cards, loading, refetch: fetchCards };
}

export default useGetCards;
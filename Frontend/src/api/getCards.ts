import { useEffect, useState, useCallback } from "react";
import { Cards } from "@/pages/learningpage";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useGetCards(userId: number) {
  const [cards, setCards] = useState<Cards[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/getCards?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
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
  }, [userId]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return { cards, loading, refetch: fetchCards };
}
export default useGetCards;
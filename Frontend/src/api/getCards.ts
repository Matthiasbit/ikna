import { useEffect, useState } from "react";
import { Cards } from "@/pages/learningpage";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function useGetCards() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/getCards`, {
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
  }, []);

  return { cards, loading };
}

export default useGetCards;

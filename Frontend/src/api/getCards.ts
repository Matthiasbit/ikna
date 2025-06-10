import { useEffect, useState } from "react";
import { Cards } from "@/pages/learningpage";

function useGetCards() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:80/getCards', {
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

import { Cards } from "@/pages/Lernseite";
import { useEffect, useState } from "react";


function useGetCards() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      
        const response = await Promise.resolve([
          { id: '1', question: 'Warum hat Ikna so einen tollen Namen?', answer: 'Ikna ist Anki nur halt nicht', difficulty: 1 },
          { id: '2', question: 'Wer begeht Kriegsverbrechen in seiner Freizeit?', answer: 'Nein nicht Matthias, es ist Benjamin Blümchen', difficulty: 2 },
          { id: '3', question: 'Welche id habe ich?', answer: '3 aber warum zum F gebe ich DANN NICHT 3 AUS......', difficulty: 2 },
          { id: '4', question: 'Eins zwei drei', answer: 'Lirum Larum leptum', difficulty: 2 },
          { id: '5', question: 'Wer füllt die restlichen Karten mit tollem Text?', answer: 'Genau Svenja!!', difficulty: 1 },
        ]);
        setCards(response);
        setLoading(false);
      
    };

    fetchCards();
  }, []);

  return { cards, loading };
};

export default useGetCards;
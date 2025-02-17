import { useEffect, useState } from "react";

const useFetchCards = () => {
  const [cards, setCards] = useState<{ id: string; question: string; answer: string; difficulty: number; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

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
      
    };

    fetchCards();
  }, []);

  return { cards };
};

export default useFetchCards;
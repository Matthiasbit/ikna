import React, { useState, useEffect, Component } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import Header from '@/Components/Header';

const Lernseite: React.FC = () => {
//react Hook
//Api Call hier einsetzen
/*
const useFetchCards = () => {
  const [cards, setCards] = useState<{ id: string; question: string; answer: string; difficulty: number; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await Promise.resolve([
          { id: '1', question: 'Warum hat Ikna so einen tollen Namen?', answer: 'Ikna ist Anki nur halt nicht', difficulty: 1 },
          { id: '2', question: 'Wer begeht Kriegsverbrechen in seiner Freizeit?', answer: 'Nein nicht Matthias, es ist Benjamin Blümchen', difficulty: 2 },
          { id: '3', question: 'Welche id habe ich?', answer: '3 aber warum zum F gebe ich DANN NICHT 3 AUS......', difficulty: 2 },
          { id: '4', question: 'Eins zwei drei', answer: 'Lirum Larum leptum', difficulty: 2 },
          { id: '5', question: 'Wer füllt die restlichen Karten mit tollem Text?', answer: 'Genau Svenja!!', difficulty: 1 },
        ]);
        setCards(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);
}

*/
//Api Call hier einsetzen
  const fetchCards = async () => {
    return [
      { id: '1', question: 'Warum hat  Ikna so einen tollen Namen?', answer: 'Ikna ist Anki nur halt nicht', difficulty: 1 },
      { id: '2', question: 'Wer begeht Kriegsverbrechen in seiner Freizeit?', answer: 'Nein nicht Matthias, es ist Benjamin Blümchen', difficulty: 2 },
      { id: '3', question: 'Welche id habe ich?', answer: '3 aber warum zum F gebe ich DANN NICHT 3 AUS......', difficulty: 2 },
      { id: '4', question: 'Eins zwei drei', answer: 'Lirum Larum leptum', difficulty: 2 },
      { id: '5', question: 'Wer füllt die restlichen Karten mit tollem Text?', answer: 'Genau Svenja!!', difficulty: 1 },

    ];
  };


  //status = richtig(true) falsch(false)
  const updateCardStatus = async (cardId: string, status: boolean) => {
    console.log(`Card ${cardId} status updated to ${status}`);
  };

  //sort cards in backend
  const SortingWithDifficulty = (cards: any[]) => {

    return cards;

  };


  const CardFront: React.FC<{ question: string; onClick: () => void }> = ({ question, onClick }) => (
    <Card onClick={onClick} sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CardContent>
        <Typography variant="h5" align="center">{question}</Typography>
      </CardContent>
    </Card>
  );

  const CardBack: React.FC<{ answer: string; onCorrect: () => void; onIncorrect: () => void }> = ({ answer, onCorrect, onIncorrect }) => (
    <Card sx={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" align="center">{answer}</Typography>
      </CardContent>
      <Box sx={{  border: '1px solid', borderColor: 'grey.400', display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px' }}>
        <Button variant="text" sx={{ width: '100%'}}>Button 1</Button>
        <Button variant="text" sx={{ width: '100%'}}>Button 2</Button>
        <Button variant="text" sx={{ width: '100%'}}>Button 3</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px' }}>
        <Button onClick={onCorrect} color="primary" variant="contained" sx={{ width: '100%' }}>Correct</Button>
        <Button onClick={onIncorrect} color="secondary" variant="contained" sx={{ width: '100%' }}>Incorrect</Button>
      </Box>
    </Card>
  );

  const CardList: React.FC = () => {
    const [cards, setCards] = useState<{ id: string; question: string; answer: string; difficulty: number; }[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
      const loadCards = async () => {
        const fetchedCards = await fetchCards();
        const sortedCards = SortingWithDifficulty(fetchedCards);
        setCards(sortedCards);
      };

      loadCards();
    }, []);

    const handleShowAnswer = () => {
      setShowAnswer(true);
    };

    const handleCorrect = async () => {
      const currentCard = cards[currentCardIndex];
      await updateCardStatus(currentCard.id, true);
      setShowAnswer(false);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handleIncorrect = async () => {
      const currentCard = cards[currentCardIndex];
      await updateCardStatus(currentCard.id, false);
      setShowAnswer(false);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };
    
  //der teil hat mich fast gebrochen, war son Header ding ig. gibtn error ohne die if klammer
  if (cards.length === 0) {
    return <div>Loading cards...</div>;
  }

    const currentCard = cards[currentCardIndex];

    return (
      <div>
        {showAnswer ? (
          <CardBack
            answer={currentCard.answer}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        ) : (
          <CardFront question={currentCard.question} onClick={handleShowAnswer} />
        )}
      </div>
    );
  };

  // Lernseite component
  return (
    <div>
      <Header text="Lernseite" />
      <Box sx={{ maxWidth: ['90%', '70%', '60%', '50%'], margin: 'auto', paddingTop: '30vh' }}>
        <CardList/>
      </Box>
    </div>
  );
};

export default Lernseite;
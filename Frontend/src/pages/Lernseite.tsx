import React, { useState, useEffect, Component } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import Header from '@/Components/Header';

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

const SortingWithDifficulty = (cards: any[]) => {
  // Sortieren nach Schwierigkeitsgrad
  cards.sort((a, b) => b.difficulty - a.difficulty);

  // Mischen mit gewichteter Zufallsverteilung
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;

};

const CardFront: React.FC<{ question: string; onClick: () => void }> = ({ question, onClick }) => (
  <Card onClick={onClick}>
    <CardContent>
      <Typography variant="h5">{question}</Typography>
    </CardContent>
  </Card>
);

const CardBack: React.FC<{ answer: string; onCorrect: () => void; onIncorrect: () => void }> = ({ answer, onCorrect, onIncorrect }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{answer}</Typography>
      <Button onClick={onCorrect} color="primary">Correct</Button>
      <Button onClick={onIncorrect} color="secondary">Incorrect</Button>
    </CardContent>
  </Card>
);

const CardList: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
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
const Lernseite: React.FC = () => {
  return (
    <div>
      <Header text="Lernseite" />
      <Box sx={{ maxWidth: ['90%', '70%', '60%', '50%'], height: '100vh', margin: 'auto', paddingTop: '40vh' }}>
        <CardList/>
      </Box>
    </div>
  );
};

export default Lernseite;
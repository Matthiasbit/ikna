import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Chip } from '@mui/material';
import Header from '@/Components/Header';
import useGetCards from '@/api/getCards';
import '@/app/lernseite.css';

export type Cards = {
  id: string;
  question: string;
  answer: string;
  difficulty: number;
};

export function Lernseite() {
  const { cards } = useGetCards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const updateCardStatus = async (cardId: string, status: boolean, chipLabel: string | null) => {
    console.log(`Card ${cardId} status updated to ${status ? 'correct' : 'incorrect'} as ${chipLabel}`);
  };

  async function handleButtonClick(value: boolean) {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setSelectedChip(null);
    updateCardStatus(cards[currentCardIndex].id, value, selectedChip);
  };

  function handleChipClick(chipLabel: string){
    setSelectedChip(chipLabel);
  };

  if (!cards || cards.length === 0) {
    return <div>Loading cards...</div>;
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div>
      <Header text="Lernseite" />
      <Box className="container">
        {showAnswer ? (
          <Card className="card">
            <Box className="cardContent">
              <Typography variant="h5" align="center">{currentCard.answer}</Typography>
            </Box>
            <Box className="chipContainer">
              <Chip
                label="Leicht"
                variant="outlined"
                className={`chip ${selectedChip === 'Leicht' ? 'chipSelected' : ''}`}
                clickable
                onClick={() => handleChipClick('Leicht')}
              />
              <Chip
                label="Mittel"
                variant="outlined"
                className={`chip ${selectedChip === 'Mittel' ? 'chipSelected' : ''}`}
                clickable
                onClick={() => handleChipClick('Mittel')}
              />
              <Chip
                label="Schwer"
                variant="outlined"
                className={`chip ${selectedChip === 'Schwer' ? 'chipSelected' : ''}`}
                clickable
                onClick={() => handleChipClick('Schwer')}
              />
            </Box>
            <Box className="buttonContainer">
              <Button onClick={() => handleButtonClick(false)} color="secondary" variant="text" className="chip">Incorrect</Button>
              <Button onClick={() => handleButtonClick(true)} color="primary" variant="text" className="chip">Correct</Button>
            </Box>
          </Card>
        ) : (
          <Card onClick={() => setShowAnswer(true)} className="card cardClickable">
            <CardContent>
              <Typography variant="h5" align="center">{currentCard.question}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}

export default Lernseite;
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Chip } from '@mui/material';
import Header from '@/Components/Header';
import useGetCards from '@/api/getCards';

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
      <Box sx={{ maxWidth:'90vw', margin: 'auto', paddingTop: '20vh' }}>
        {showAnswer ? (
          <Card sx={{ minHeight: '70vh', borderRadius: '16px', backgroundColor: '#E3F2FD', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" align="center">{currentCard.answer}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px' }}>
              <Chip
                label="Leicht"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'Leicht' ? 'lightblue' : 'inherit' }}
                clickable
                onClick={() => handleChipClick('Leicht')}
              />
              <Chip
                label="Mittel"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'Mittel' ? 'lightblue' : 'inherit' }}
                clickable
                onClick={() => handleChipClick('Mittel')}
              />
              <Chip
                label="Schwer"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'Schwer' ? 'lightblue' : 'inherit' }}
                clickable
                onClick={() => handleChipClick('Schwer')}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px' }}>
              <Button onClick={() => handleButtonClick(false)} color="secondary" variant="text" sx={{ width: '100%' }}>Incorrect</Button>
              <Button onClick={() => handleButtonClick(true)} color="primary" variant="text" sx={{ width: '100%' }}>Correct</Button>
            </Box>
          </Card>
        ) : (
          <Card onClick={() => setShowAnswer(true)} sx={{ minHeight: '70vh', borderRadius: '16px', backgroundColor: '#E3F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor : "pointer" }}>
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
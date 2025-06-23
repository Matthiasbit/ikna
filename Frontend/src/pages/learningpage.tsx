import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Chip } from '@mui/material';
import Header from '@/Components/Header';
import useGetCards from '@/api/getCards';
import updateCard from '@/api/updateCard';
import "../app/bodyfix.css";
import { useParams } from 'react-router-dom';

export type Cards = {
  id: string;
  question: string;
  answer: string;
  status?: number;
  difficulty: string;
};

type UpdateCardPayload = {
  id: number;
  status: number;
  difficulty?: string;
};

export function Learningpage() {
  const { setId } = useParams(); 
  const { cards, refetch } = useGetCards();
  const filteredCards = setId ? cards.filter(card => String(card.set) === String(setId)) : cards;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  if (!filteredCards || filteredCards.length === 0) {
    return <div>Keine Karten in diesem Set gefunden.</div>;
  }

  const currentCard = filteredCards[currentCardIndex];

  async function handleButtonClick(isCorrect: boolean) {
    setShowAnswer(false);

    const current = filteredCards[currentCardIndex];
    let newStatus = isCorrect
      ? (current.status ?? 0) + 1
      : (current.status ?? 0) - 1;

    newStatus = Math.max(0, Math.min(10, newStatus));

    const updateObj: UpdateCardPayload = {
      id: Number(current.id),
      status: newStatus,
    };
    if (selectedChip !== null) {
      updateObj.difficulty = selectedChip;
    }

    await updateCard(updateObj);
    refetch();

    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredCards.length);
    setSelectedChip(null);
  }

  function handleChipClick(chipLabel: string){
    setSelectedChip(chipLabel);
  };

  if (!cards || cards.length === 0) {
    return <div>Loading cards...</div>;
  }

  return (
    <div>
      <Header text="Lernseite" />
      <Box sx={{ maxWidth:'90vw', margin: 'auto', paddingTop: '20px' }}>
        {showAnswer ? (
          <Card sx={{ minHeight: '70vh', borderRadius: '16px', backgroundColor: '#E3F2FD', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" align="center">{currentCard.answer}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px', height: '8vh' }}>
              <Chip
                label="Leicht"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'leicht' ? 'lightblue' : 'inherit', height: '100%' }}
                clickable
                onClick={() => handleChipClick('leicht')}
              />
              <Chip
                label="Mittel"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'mittel' ? 'lightblue' : 'inherit', height: '100%'}}
                clickable
                onClick={() => handleChipClick('mittel')}
              />
              <Chip
                label="Schwer"
                variant="outlined"
                sx={{ width: '100%', backgroundColor: selectedChip === 'schwer' ? 'lightblue' : 'inherit', height: '100%' }}
                clickable
                onClick={() => handleChipClick('schwer')}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px' }}>
              <Button onClick={() => handleButtonClick(false)} color="secondary" variant="text" sx={{ width: '100%','&:hover': {borderColor: '#d32f2f', backgroundColor: 'rgba(239,154,154,0.1)',}, }}>Incorrect</Button>
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

export default Learningpage;
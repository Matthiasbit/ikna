import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Chip, CircularProgress} from '@mui/material';
import Header from '@/Components/Header';
import updateCard from '@/api/updateCard';
import useGetCards, { Cards } from '@/api/getCards';
import "../app/bodyfix.css";
import {useSearchParams} from "next/navigation";


function Learningpage() {
  const searchParams = useSearchParams();
  const setIdParam = searchParams?.get("setId");
  const setId = setIdParam ? parseInt(setIdParam, 10) : undefined;
  const { cards, loading, refetch } = useGetCards(Number(setId));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  if (loading) {
      return (
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vw'
          }}>
              <CircularProgress/>
          </div>
      );
  }

  const currentCard = cards[currentCardIndex];

  async function handleButtonClick(isCorrect: boolean) {
    setShowAnswer(false);

    const current = cards[currentCardIndex];
    let newStatus = isCorrect
      ? (current.status ?? 0) + 1
      : (current.status ?? 0) - 1;

    newStatus = Math.max(0, Math.min(10, newStatus));

    const updateObj: Cards = {
      ...current,
      status: newStatus,
      lastreview: new Date().toISOString(),
      difficulty: selectedChip ?? current.difficulty ?? "mittel",
    };

    await updateCard(updateObj);

    if (currentCardIndex === cards.length - 1) {
      refetch();
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
    setSelectedChip(null);
  }

  function handleChipClick(chipLabel: string){
    setSelectedChip(chipLabel);
  };

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
              <Button type="button" onClick={() => handleButtonClick(false)} color="secondary" variant="text" sx={{ width: '100%','&:hover': {borderColor: '#d32f2f', backgroundColor: 'rgba(239,154,154,0.1)',}, }}>Incorrect</Button>
              <Button type="button" onClick={() => handleButtonClick(true)} color="primary" variant="text" sx={{ width: '100%' }}>Correct</Button>
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
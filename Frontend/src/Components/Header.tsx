import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

//logo is based in public didnt manage it else
//logo verschiebt überschrift
export default function Header({ text }) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img src='/AnkiLogo.png' alt="Anki Logo" width={50} height={50} />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: 'center'}}>
          {text}
        </Typography>
        {/* Platzhalter, um den Text zentriert zu halten */}
        <Box sx={{ width: 50 }} /> 
      </Toolbar>
    </AppBar>
  );
}
import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  text: string;
}
//logo is located in public didnt manage it else
//neben Logo Namen
export default function Header({ text}: HeaderProps ) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link href="/">
              <Image src="/IknaLogo.png" alt="Anki Logo" width={50} height={50} />
        </Link>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: 'center'}}>
          {text}
        </Typography>
        {/* Platzhalter, um den Text zentriert zu halten */}
        <Box sx={{ width: 50 }} /> 
      </Toolbar>
    </AppBar>
  );
}
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import SettingdsDialog from './SettingsDialog';


type HeaderProps = {
  text: string;
}

//logo is based in public didnt manage it else
//logo verschiebt überschrift
export default function Header({ text }: HeaderProps) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <>
    <AppBar position="relative">
      <Toolbar>
        <Image src='/IknaLogo.png' alt="Anki Logo" width={50} height={50} />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: "flex", justifyContent: 'center'}}>
          {text}
        </Typography>
        <SettingsIcon onClick={handleOpen} style={{cursor: "pointer"}}/>
      </Toolbar>
    </AppBar>
    <SettingdsDialog open={open} handleClose={handleOpen} />
    </>
  );
}
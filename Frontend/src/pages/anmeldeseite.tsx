import React, { useState } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton,InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from '@/Components/Header';

//das muss in layout tsx oder in globals css umgesetzt werden
import '../app/bodyfix.css';


export function Anmeldeseite() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  //macht das hier nicht logs?
  function anmeldung() {
    setError(true);
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //zuvor war alles in .app macht es sinn in pages? im internet stand standart routing finden in app statt auch hies index früher anders
  //login erstellt noch 2 augen für pw sichtbarkeit onclick
  //Header fehlt noch, styling fehlt noch, auch überlegen ob es nicht was besseres als h2 gibt... 
  return(
    <div>
      <Header  text="login"/>
      <div style={{ maxWidth: '30vw', margin: 'auto', height: '100vh', paddingTop: '10vh'}}>
        
          <Stack spacing={2} direction="column">
            <TextField
              error={email === "" && error}
              required 
              id="email"
              label="Email:"
              placeholder="example@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}/>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password" error={password === "" && error}>Password</InputLabel>
            <OutlinedInput
              id="password"
              error={password === "" && error}
              required 
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button onClick={anmeldung} variant="contained" color="primary">Login</Button>
          </Stack>
      </div>
    </div>
  );
};

export default Anmeldeseite;
  
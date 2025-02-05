import React, { useState } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton,InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function Anmeldeseite() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const anmeldung = () => {
    setError(true);
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  

  //Header fehlt noch, styling fehlt noch, auch überlegen ob es nicht was besseres als h2 gibt... 
  return(
    <div style={{ maxWidth: '400px', margin: 'auto'}}>
      <h2>Login</h2>
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
        <Button onClick={anmeldung}>Login</Button>
        </Stack>
    </div>
  );
};

export default Anmeldeseite;
  
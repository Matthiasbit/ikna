import React, { useState } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton,InputAdornment, Typography, Link, Tabs, Tab, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Header from '@/Components/Header';

export function Anmeldeseite() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);

  function anmeldung() {
    setError(true);
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleLoginClick = () => {
    setIsLogin(true);
    setIsResetPassword(false);  };

  const handleResetLinkClick = () => {
    setIsResetPassword(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      handleLoginClick();
    } else {
      setIsLogin(false);
      setIsResetPassword(false);
    }
  };
  
  //login erstellt noch 2 augen für pw sichtbarkeit onclick im firefox browser
  return(
    <div>
      <Header text={isLogin ? (isResetPassword ? "Reset Password" : "Login") : "Sign Up"} />
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '20vh' }}>
        <Tabs value={isLogin ? 0 : 1} onChange={handleTabChange} centered>
          <Tab label="Login" onClick={handleLoginClick} />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      <div style={{ maxWidth: '30vw', margin: 'auto', height: '100vh', paddingTop: '5vh'}}>
        <Typography variant="body1" gutterBottom>
          {isLogin ? (
            isResetPassword ? (
              <>
                Enter your email to reset your password. Or Log in <Link href="#" onClick={handleLoginClick}>here</Link>.
              </>
            ) : (
              <>
                Log in to an existing account. Or reset your Password <Link href="#" onClick={handleResetLinkClick}>here</Link>.
              </>
            )
          ) : (
            "Create a new account."
          )}
        </Typography>
        <Stack spacing={2} direction="column">
          <TextField
            error={email === "" && error}
            required 
            id="email"
            label="Email:"
            placeholder="example@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}/>
          {!isResetPassword && (
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
                      aria-label={showPassword ? 'hide the password' : 'display the password'}
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
          )}
          <Button onClick={anmeldung} variant="contained" color="primary">
            {isLogin ? (isResetPassword ? "Reset Password" : "Login") : "Sign Up"}
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Anmeldeseite;
  
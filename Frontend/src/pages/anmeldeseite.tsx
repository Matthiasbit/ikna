import React, { useState } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton,InputAdornment, Typography, Link } from '@mui/material';
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
    setIsResetPassword(false);
  };
  const handleSignUpClick = () => {
    setIsLogin(false);
    setIsResetPassword(false);
  };
  const handleResetPasswordClick = () => {
    setIsResetPassword(true);
  };
  
  //login erstellt noch 2 augen für pw sichtbarkeit onclick im firefox browser
  return(
    <div>
      <Header text={isLogin ? (isResetPassword ? "Reset Password" : "Login") : "Sign Up"} />
      <div style={{paddingTop: '20vh', float: 'right', marginRight:'10vh'}}>
      <Button variant={isLogin ? "contained" : "outlined"} color="primary" onClick={handleLoginClick}>
        Login
      </Button>
      <Button variant={!isLogin ? "contained" : "outlined"} color="secondary" onClick={handleSignUpClick}>
        Sign Up
      </Button>
      </div>
      <div style={{ maxWidth: '30vw', margin: 'auto', height: '100vh', paddingTop: '20vh'}}>
      <Typography variant="h4" component="h1" gutterBottom>
          {isLogin ? (isResetPassword ? "Reset Password" : "Login") : "Sign Up"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {isLogin ? (
            isResetPassword ? (
              "Enter your email to reset your password."
            ) : (
              <>
                Log in to an existing account. Or reset your Password <Link href="#" onClick={handleResetPasswordClick}>here</Link>.
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
  
import React, { useState } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Typography, Link, Tabs, Tab, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Header from '@/Components/Header';

export function Anmeldeseite() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [tabValue, setTabValue] = useState("1");

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

  const handleResetLinkClick = () => {
    setIsResetPassword(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    if (newValue === "1") {
      handleLoginClick();
    } else {
      setIsLogin(false);
      setIsResetPassword(false);
    }
  };
  
  return (
    <div>
      <Header text={isLogin ? (isResetPassword ? "Reset Password" : "Login") : "Sign Up"} />
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '20vh' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} centered>
              <Tab label="Login" value="1"/>
              <Tab label="Sign Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ maxWidth: { xs: '90%', sm: '70%', md: '50%', lg: '30%' }, margin: 'auto', height: '100vh', paddingTop: '5vh' }}>
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
                  <>
                    Create a new account.
                  </>
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
                  onChange={(event) => setEmail(event.target.value)} />
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
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ maxWidth: { xs: '90%', sm: '70%', md: '50%', lg: '30%' }, margin: 'auto', height: '100vh', paddingTop: '5vh' }}>
              <Typography variant="body1" gutterBottom>
                Create a new account.
              </Typography>
              <Stack spacing={2} direction="column">
                <TextField
                  error={email === "" && error}
                  required
                  id="email"
                  label="Email:"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
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
                <Button onClick={anmeldung} variant="contained" color="primary">
                  Sign Up
                </Button>
              </Stack>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Anmeldeseite;
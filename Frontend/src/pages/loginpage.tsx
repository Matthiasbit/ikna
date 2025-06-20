import React, { useState, useEffect } from 'react';
import { TextField, Stack, Button, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Typography, Link, Tab, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Header from '@/Components/Header';
import "../app/bodyfix.css";
import useRegistration from '@/api/registration';


export function Loginpage() {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [validationError, setValidationError] = useState(false);
const [isResetPassword, setIsResetPassword] = useState(false);
const [tabValue, setTabValue] = useState<"1" | "2">("1");
const { registration, errormessage, success} = useRegistration();

<<<<<<< HEAD

  function anmeldung() {
    setValidationError(true);
    console.log('Email:', email);
    console.log('Password:', password);
    window.location.href =  "/ikna/";
  };
=======
  function logInOrSignUp(signUp: boolean) {
    setValidationError(true);
    registration(email, password, signUp);
  }
>>>>>>> c9e645a6adaca4c4d5a053432185a9ef6039ca8a

  useEffect(() => {
    if (success) {
      window.location.href = "/ikna/";
    }
  }, [success]);

<<<<<<< HEAD
  function handleRegistration() {
    setValidationError(true);
    registration(email, password);
  }


  
=======
>>>>>>> c9e645a6adaca4c4d5a053432185a9ef6039ca8a
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleResetLinkClick = () => {
    setIsResetPassword(!isResetPassword);
  };
  
  return (
    <div>
      <Header text={tabValue === "1" ? isResetPassword ? "Reset Password" : "Login" : "Sign up" } />
      <Box sx={{ width: '100%',  marginTop: '15vh' }}>
        <Box sx={{ maxWidth: { xs: '90%', sm: '70%', md: '50%', lg: '30%' }, margin: 'auto'}}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_event, value) => setTabValue(value)} centered>
                <Tab label="Login" value="1"/>
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography variant="body1" gutterBottom>
                { isResetPassword ? (
                    <>
                      Enter your email to reset your password. Or Log in <Link href="#" onClick={handleResetLinkClick}>here</Link>.
                    </>
                  ) : (
                    <>
                      Log in to an existing account. Or reset your Password <Link href="#" onClick={handleResetLinkClick}>here</Link>.
                    </>
                  )}
              </Typography>
              <Stack spacing={2} direction="column">
                <TextField
                  error={email === "" && validationError}
                  id="email"
                  label="Email:"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
                {!isResetPassword && (
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="password" error={password === "" && validationError}>Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      error={password === "" && validationError}
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
                <Button onClick={() => logInOrSignUp(false)} variant="contained" color="primary" type="button">
                  {isResetPassword ? "Reset Password" : "Login"}
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <Typography variant="body1" gutterBottom>
                Create a new account.
              </Typography>
              <Stack spacing={2} direction="column">
                <TextField
                  error={email === "" && validationError}
                  required
                  id="email"
                  label="Email:"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)} />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="password" error={password === "" && validationError}>Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    error={password === "" && validationError}
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
                <Button onClick={() => logInOrSignUp(true)} variant="contained" color="primary" type="button">
                  Sign Up
                </Button>
                {errormessage && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errormessage}
                  </Typography>
                )}
                {success && (
                  <Typography color="success.main" sx={{ mt: 2 }}>
                    Registrierung erfolgreich!
                  </Typography>
                )}
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </div>
  );
};

export default Loginpage;
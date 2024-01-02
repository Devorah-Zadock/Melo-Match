import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Administrator from './Administrator';
import './App.css';

const defaultTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              color: 'rgb(145, 104, 23)',
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'rgb(193, 144, 48)',
              borderWidth: 3,
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgb(193, 144, 48)',
              borderWidth: 3,
            },
            '& color':{
              color:'black',
            },
          },
        },
      },
    },
  },
});

export default function SignIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userName);

    // Check if the entered username and password are valid
    if (userName === 'Devorah' && password === '1234') {
      console.log(userName);
      setLoggedIn(true);
    }
    else{
      alert("Incorrect username and/or password")
    }
  };

  return loggedIn ? (
    <Administrator />
  ) : (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <div>
            <img src={logo} alt="Logo MeloMatch" width={150} />
          </div> */}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              variant="outlined"
              autoFocus
              onChange={(event)=>{
                setUserName(event.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>{
                setPassword(event.target.value)
              }}
            />
            <Button id='btn'
              // type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // href='Administrator'
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link id='link' href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './logoMeloMatch.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const defaultTheme = createTheme();
export default function Home() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
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
          <div>
            <img src={logo} alt="Logo MeloMatch" width={150} />
          </div>
          <Typography component="h1" variant="h5">
            Welcome to MeloMatch!
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            <Button id='btn'
              type="submit"
              href="AudioRecorder"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              User Login
            </Button>

            <Button id='btn' 
              type="submit"
              href="SignIn"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}            
            >
             Admin Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
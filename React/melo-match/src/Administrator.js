import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const defaultTheme = createTheme();
export default function Administrator() {
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
          <Typography component="h1" variant="h5">
            Welcome Administrator!
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            <Button id='btn'
              type="submit"
              href="AddSong"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add a Song
            </Button>

            <Button id='btn' 
              type="submit"
              href="DeleteSong"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}            
            >
             Delete a Song
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import {
  Typography,
  Link,
  Container,
  Box,
  TextField,
  Button,
  MenuItem,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

const defaultTheme = createTheme();

export default function DeleteSong() {
  const [songList, setSongList] = useState([]);
  const [selectedSong, setSelectedSong] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-songs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSongList(data);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedSong) {
      const data = new FormData(event.currentTarget);
      const selectedSongData = songList.find(song => song.id === selectedSong);

      console.log({
        email: data.get('email'),
        password: data.get('password'),
        selectedSong: selectedSongData,
      });
    } else {
      console.log('Please select a song');
    }
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
            Delete a Song!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchSong"
              label="Search Song"
              name="searchSong"
              autoComplete="searchSong"
              autoFocus
              select
              value={selectedSong}
              onChange={event => setSelectedSong(event.target.value)}
            >
              {songList.map(song => (
                <MenuItem key={song.id} value={song.id}>
                  {song.title}
                </MenuItem>
              ))}
            </TextField>
            <Button id='btn'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
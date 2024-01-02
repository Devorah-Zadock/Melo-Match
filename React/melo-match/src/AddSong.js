import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { Container, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { Button, Typography } from '@mui/material';

const defaultTheme = createTheme();

// Component for adding a new song.
export default function AddSong() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Event handler for file input change, updates the selected folder state.
  const handleFileInputChange = (event) => {
    const folder = event.target.files[0];
    setSelectedFolder(folder);
  };

  // Handles the form submission, Sends the selected folder to the server for adding the song, displays success or error messages accordingly.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFolder) {
      const formData = new FormData();
      formData.append('file', selectedFolder);

      fetch('http://127.0.0.1:5000/add-song', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            <label>"Song added successfully"</label>
            alert('Song added successfully');
          } else {
            alert('Error adding song, It is possible that the file you uploaded is not in mp3 format');
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
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
            Path to the file:
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <input
              accept="audio/*"
              id="folder-input"
              type="file"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="folder-input">
              <Button
                variant="contained"
                component="span"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Select a file
              </Button>
            </label>

            {selectedFolder && (
              <Typography variant="body1">
                Selected folder: {selectedFolder.name}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!selectedFolder}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
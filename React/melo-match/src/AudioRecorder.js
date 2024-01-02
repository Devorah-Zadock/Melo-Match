import { useState, useRef, useEffect } from "react";
import logo from './logoMeloMatch.jpg';
import './App.css';
import { Button, Typography } from '@mui/material';

const mimeType = "audio/wav";

// Component for recording and sending audio files.
const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audio, setAudio] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [audioElement, setAudioElement] = useState(null);

  // Event handler for file input change, updates the selected file state.
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Requests microphone permission and sets up the media stream, if the MediaRecorder API is not supported, displays an error message.
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  // Starts the recording process, updates the recording status and creates a new MediaRecorder instance.
  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });

    mediaRecorder.current = media;

    mediaRecorder.current.start();

    let localAudioChunks = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  // Handles the sending of audio data, if a selected file is present, reads the file and sends its data,
  // otherwise, stops the recording and sends the recorded audio data.

  const handleSend = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result;
        const audioBlob = new Blob([new Uint8Array(arrayBuffer)], {
          type: selectedFile.type
        });
        sendAudio(audioBlob);
      };
      fileReader.readAsArrayBuffer(selectedFile);
    } else {
      stopRecording(new Blob(audioChunks, { type: mimeType }));
    }
  };

  // Stops the recording process, updates the recording status and stops the MediaRecorder.
  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      console.log(audioBlob);
      sendAudio(audioBlob)
    };
  };

  const sendAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const songBlob = await response.blob();

      const encodedSongName = response.headers.get("X-Song-Name");
      const songName = atob(encodedSongName);

      const songURL = URL.createObjectURL(songBlob);

      const audioElement = new Audio(songURL);
      audioElement.load();
      setAudioElement(audioElement);

      setCurrentSong({
        songName: songName,
        songURL: songURL,
      });

    } catch (error) {
      alert("No Results")
    }
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudio(audioUrl);
  };

  return (
    <>
      <nav>
        <img src={logo} alt="Logo MeloMatch" width={150} />
        <div>
          <a className="links" href="./">
            Home{" "}
          </a>
          <a className="links" href="AudioRecorder">
            Recognize songs{" "}
          </a>
          <a className="links" href="Administrator">
            Administrator{" "}
          </a>
        </div>
      </nav>
      <div>
        <main>
          <div className="audio-controls">
            <input
              accept="audio/*"
              id="file-input"
              type="file"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Select a file
              </Button>
            </label>

            {selectedFile && (
              <Typography variant="body1">
                Selected File: {selectedFile.name}
              </Typography>
            )}

            <Button
              onClick={handleSend}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!selectedFile}>
              Send
            </Button>

            {!permission ? (
              <button onClick={getMicrophonePermission} type="button" id="btn">
                פתח מיקרופון
              </button>
            ) : null}

            {permission && recordingStatus === "inactive" ? (
              <button onClick={startRecording} type="button" id="btn">
                התחל הקלטה
              </button>
            ) : null}

            {recordingStatus === "recording" ? (
              <button onClick={stopRecording} type="button" id="btn">
                עצור הקלטה
              </button>
            ) : null}
          </div>
          <div>
            {currentSong && (
              <div className="component">
                {/* <h2>{currentSong.songName}</h2> */}
                <img className="musicCover" />
                <div>
                </div>
                <div>
                  <button className="playButton" onClick={() => audioElement.play()}>Play</button>
                  <button className="playButton" onClick={() => audioElement.pause()}>Pause</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AudioRecorder;

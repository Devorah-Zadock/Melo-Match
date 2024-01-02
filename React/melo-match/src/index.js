
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Sick } from '@mui/icons-material';
import SignIn from './SignIn';
import Home from './Home';
import AudioRecorder from './AudioRecorder';
import Administrator from './Administrator';
import AddSong from './AddSong';
import DeleteSong from './DeleteSong';

const router = createBrowserRouter([

  {
    path: "/",
    element: <Home/>,
  },
  
  {
    path: "/SignIn",
    element: <SignIn/>,
  },

  {
    path: "/AudioRecorder",
    element: <AudioRecorder/>,
  },

  {
    path: "/Administrator",
    element: <Administrator/>,
  },
  
  {
    path: "/AddSong",
    element: <AddSong/>,
  },

  {
    path: "/DeleteSong",
    element: <DeleteSong/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';


const neonTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#111111',
    },
    primary: {
      main: '#00fff7',
    },
    secondary: {
      main: '#ff00e0',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': { color: '#00fff7' },
          '& .MuiInputBase-root': {
            color: '#ffffff',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00fff7',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(...)',
          color: '#000',
          fontWeight: 'bold',
          boxShadow: '0 0 10pxrgb(0, 0, 0), 0 0 20pxrgb(2, 2, 2)',
          '&:hover': {
            boxShadow: '0 0 15px #00fff7, 0 0 25pxrgb(8, 8, 8)',
            background: 'linear-gradient(45deg,rgb(92, 158, 156) 10%,rgb(51, 42, 50) 80%)',
          },
        },
      },
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ThemeProvider theme={neonTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from'react-redux';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store from './app/store'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-datepicker/dist/react-datepicker.css'
import './github-markdown-light.css'

import App from './App';
import './App.css'
export const defaultTheme = {
  colors: {
    aau: {
      text: "#FFFFFF",
      primary: "#211A52",
      bg: "#f7fafc",
      hover: "#211A525C",
      green: "#0E8563",
      yellow: "#FFC107",
      red: "#DC3545",
      button: {
        50: "#211A5220",
        100: "#211A5250",
        500: "#211A52",
        600: "#211A52d1",
        700: "#211A52",
      },
      buttonRed: {
        50: "#DC354520",
        100: "#DC354550",
        500: "#DC3545",
        600: "#DC3545D1",
        700: "#DC3545",
      },
      buttonGreen: {
        50: "#0E856320",
        100: "#0E856350",
        500: "#0E8563",
        600: "#0E8563D1",
        700: "#0E8563",
      },
      buttonGray: {
        50: "#F7FAFC",
        100: "#EDF2F7",
        200: "#E2E8F0",
        300: "#CBD5E0",
        400: "#A0AEC0",
        500: "#718096",
        600: "#4A5568",
        700: "#2D3748",
        800: "#1A202C",
        900: "#171923",
      },
    },
    difficulty: {
      beginner: "#F58EEE",
      veryEasy: "#6EC261",
      easy: "#1A750C",
      medium: "#EDBC09",
      hard: "#E66902",
      veryHard: "#B30000",
      insanse: "#000000"
    }
  }
}

const theme = extendTheme(defaultTheme);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);



/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#115a9a",
      sub: "#2b86d5",
    },
    secondary: {
      main: "#027c85",
      dark: "#014f57",
    },
    background: {
      default: "#ffffff",
      paper: "#f7f7f7",
    },
    text: {
      primary: "#212121",
      secondary: "#595959",
      heading: "#014f57",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

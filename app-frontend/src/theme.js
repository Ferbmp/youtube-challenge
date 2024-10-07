"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;

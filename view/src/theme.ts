"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#181818",
      paper: "#212121",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;

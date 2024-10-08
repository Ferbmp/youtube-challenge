"use client";

import React from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        value={value}
        onChange={onChange}
        placeholder="Insira a URL do YouTube"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PlaylistAddIcon sx={{ color: "#ccc" }} />
            </InputAdornment>
          ),
          sx: {
            color: "#ccc",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#444",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#888",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#ccc",
              opacity: 1,
            },
            backgroundColor: "#222",
            borderRadius: "999px",
            height: "40px",
          },
        }}
        sx={{
          width: { xs: "100%", sm: "400px" },
          mr: 1,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!value.trim()}
        sx={{
          height: "40px",
          minWidth: "64px",
          borderRadius: "999px",
          backgroundColor: "#303030",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#424242",
          },
        }}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export default SearchBar;

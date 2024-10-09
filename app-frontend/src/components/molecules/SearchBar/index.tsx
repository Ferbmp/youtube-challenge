"use client";

import React from "react";
import { InputAdornment } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { StyledButton, StyledForm, StyledTextField } from "./styles";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSubmit }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        value={value}
        onChange={onChange}
        placeholder="Insira a URL do YouTube"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PlaylistAddIcon />
            </InputAdornment>
          ),
        }}
      />
      <StyledButton type="submit" variant="contained" disabled={!value.trim()}>
        Adicionar
      </StyledButton>
    </StyledForm>
  );
};

export default SearchBar;

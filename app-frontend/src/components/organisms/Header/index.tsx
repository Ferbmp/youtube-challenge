"use client";
import React from "react";

import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import SearchBar from "@/components/molecules/SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const HeaderOrganism: React.FC<HeaderProps> = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">Minha Playlist</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default HeaderOrganism;

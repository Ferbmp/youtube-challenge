"use client";
import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import SearchBar from "@/components/molecules/SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0f0f0f" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

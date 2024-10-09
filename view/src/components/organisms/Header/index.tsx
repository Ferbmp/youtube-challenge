"use client";
import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import { StyledAppBar, StyledToolbar } from "./styles";

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
    <StyledAppBar position="static">
      <StyledToolbar>
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;

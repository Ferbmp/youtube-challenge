import styled from "@emotion/styled";
import { TextField, Button } from "@mui/material";

export const StyledForm = styled("form")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 400px;
  margin-right: 1rem;
  & .MuiOutlinedInput-root {
    color: #ccc;
    background-color: #222;
    border-radius: 999px;
    height: 40px;

    & .MuiOutlinedInput-notchedOutline {
      border-color: #444;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #666;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #888;
    }

    & .MuiInputBase-input::placeholder {
      color: #ccc;
      opacity: 1;
    }
  }
`;

export const StyledButton = styled(Button)`
  height: 40px;
  min-width: 100px;
  text-transform: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  background-color: #303030;
  color: #fff;

  &:hover {
    background-color: #424242;
  }
`;

import styled from "@emotion/styled";
import { ListItem, IconButton, ListItemButton } from "@mui/material";

export const StyledListItem = styled(ListItem)<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? "#282828" : "transparent"};
  &:hover {
    background-color: #383838;
  }
  transition: background-color 0.3s ease;
  width: 100%;
`;

export const StyledListItemButton = styled(ListItemButton)`
  width: 100%;
`;

export const StyledIconButton = styled(IconButton)`
  color: #fff;
`;

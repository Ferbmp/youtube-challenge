import styled from "@emotion/styled";
import { Paper, Box } from "@mui/material";

export const ScrollableDiv = styled("div")`
  height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: #606060 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #606060;
    border-radius: 10px;
  }
`;

export const StyledPaper = styled(Paper)`
  background-color: #0f0f0f;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

export const StyledTitleBox = styled(Box)`
  padding: 16px;
  border-bottom: 1px solid #303030;
`;

export const EmptyPlaylistBox = styled(Box)`
  padding: 16px;
  text-align: center;
`;

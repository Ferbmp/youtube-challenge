import styled from "@emotion/styled";
import { Box, CardMedia } from "@mui/material";
import { CardMediaProps } from "@mui/material/CardMedia";

interface ExtendedCardMediaProps extends CardMediaProps {
  alt?: string;
}

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const StyledCardMedia = styled(CardMedia)<ExtendedCardMediaProps>`
  max-width: 168px;
  height: 100%;
  max-height: 94px;
  border-radius: 4px;
  flex-shrink: 0;
`;

export const StyledTextBox = styled(Box)`
  padding-left: 16px;
  overflow: hidden;
  margin-bottom: auto;

  & .MuiTypography-h6 {
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }

  & .MuiTypography-body2 {
    color: #b3b3b3;
    margin-top: 2px;
  }
`;

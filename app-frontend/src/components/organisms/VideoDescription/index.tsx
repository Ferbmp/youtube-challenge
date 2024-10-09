import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledBox, TitleTypography, DescriptionTypography } from "./styles";

interface VideoDescriptionProps {
  title?: string;
  description?: string;
}

const VideoDescription: React.FC<VideoDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <StyledBox>
      <TitleTypography variant="h6">{title}</TitleTypography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descrição:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DescriptionTypography paragraph>{description}</DescriptionTypography>
        </AccordionDetails>
      </Accordion>
    </StyledBox>
  );
};

export default VideoDescription;

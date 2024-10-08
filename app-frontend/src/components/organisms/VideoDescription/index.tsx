import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface VideoDescriptionProps {
  title?: string;
  description?: string;
}

const VideoDescription: React.FC<VideoDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descrição:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph style={{ whiteSpace: "pre-line" }}>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VideoDescription;

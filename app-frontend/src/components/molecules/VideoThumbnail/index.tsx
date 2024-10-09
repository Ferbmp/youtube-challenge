"use client";

import React from "react";
import { Typography } from "@mui/material";
import { StyledBox, StyledCardMedia, StyledTextBox } from "./styles";

interface VideoThumbnailProps {
  thumbnail: string;
  title: string;
  description: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  thumbnail,
  title,
  description,
}) => {
  return (
    <StyledBox>
      <StyledCardMedia component="img" src={thumbnail} alt={title} />
      <StyledTextBox>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
      </StyledTextBox>
    </StyledBox>
  );
};

export default VideoThumbnail;

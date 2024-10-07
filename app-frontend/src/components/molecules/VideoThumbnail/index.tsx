"use client";
import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface VideoThumbnailMoleculeProps {
  thumbnail: string;
  title: string;
}

const VideoThumbnail: React.FC<VideoThumbnailMoleculeProps> = ({
  thumbnail,
  title,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar src={thumbnail} variant="square" sx={{ width: 80, height: 45 }} />
      <Typography variant="body1" sx={{ marginLeft: 1 }}>
        {title}
      </Typography>
    </Box>
  );
};

export default VideoThumbnail;

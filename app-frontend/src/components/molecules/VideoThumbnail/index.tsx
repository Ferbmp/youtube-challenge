"use client";
import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";

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
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <CardMedia
        component="img"
        image={thumbnail}
        alt={title}
        sx={{
          maxWidth: 168,
          height: "100%",
          maxHeight: 94,
          borderRadius: "4px",
          flexShrink: 0,
        }}
      />
      <Box
        sx={{
          marginLeft: 2,
          overflow: "hidden",
          flex: 1,
          width: "100%",
          maxWidth: "220px",
          minWidth: "220px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#aaa",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 0.5,
            width: "100%",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoThumbnail;

"use client";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { Box } from "@mui/material";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "500",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Box>
      <YouTube videoId={videoId} opts={opts} />
    </Box>
  );
};

export default VideoPlayer;

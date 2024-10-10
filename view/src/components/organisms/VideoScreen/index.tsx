import React from "react";
import { Box } from "@mui/material";

import VideoDescription from "../VideoDescription";
import VideoPlayer from "../VideoPlayer";
import { Video } from "@/types";

interface VideoScreenProps {
  currentVideo: Video | null;
}

const VideoScreen: React.FC<VideoScreenProps> = ({ currentVideo }) => {
  return (
    <Box>
      {currentVideo && (
        <>
          <VideoPlayer videoId={currentVideo?.id} />
          <VideoDescription
            title={currentVideo?.title}
            description={currentVideo?.description}
          />
        </>
      )}
    </Box>
  );
};

export default VideoScreen;

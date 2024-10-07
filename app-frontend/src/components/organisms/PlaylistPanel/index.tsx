import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import VideoList from "../VideoList";
import { Video } from "@/types";

interface PlaylistPanelProps {
  videos: Video[];
  onVideoSelect: (id: string) => void;
  onVideoDelete: (id: string) => void;
  currentVideoId: string;
}

const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  videos,
  onVideoSelect,
  onVideoDelete,
  currentVideoId,
}) => {
  return (
    <Paper
      sx={{
        width: "100%",
        maxHeight: "500",
        overflowY: "auto",
        backgroundColor: "#121212",
        color: "#fff",
        borderRadius: "8px",
        marginLeft: "1.5rem",
      }}
    >
      <Box sx={{ padding: 2, borderBottom: "1px solid #424242" }}>
        <Typography variant="h6">Minha Playlist</Typography>
      </Box>
      <VideoList
        videos={videos}
        onVideoSelect={onVideoSelect}
        onVideoDelete={onVideoDelete}
        currentVideoId={currentVideoId}
      />
    </Paper>
  );
};

export default PlaylistPanel;

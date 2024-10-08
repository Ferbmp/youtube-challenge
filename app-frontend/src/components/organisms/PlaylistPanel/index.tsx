"use client";
import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

import { Video } from "@/types";
import VideoList from "../VideoList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideos } from "@/hooks/useVideos";

interface PlaylistPanelProps {
  videos: Video[];
  onVideoSelect: (id: string) => void;
  onVideoDelete: (id: string) => void;
  currentVideoId?: string;
  isLoading?: boolean;
}

const PlaylistPanel: React.FC<PlaylistPanelProps> = ({
  videos,
  onVideoSelect,
  onVideoDelete,
  currentVideoId,
  isLoading,
}) => {
  const { throttledFetchNextPage, hasNextPage } = useVideos();
  return (
    <div
      id="scrollableDiv"
      style={{
        height: "500px",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        scrollbarWidth: "thin",
        scrollbarColor: "#606060 transparent",
      }}
    >
      <InfiniteScroll
        dataLength={videos.length}
        next={throttledFetchNextPage}
        hasMore={!!hasNextPage || false}
        loader={
          videos.length > 0 ? (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : null
        }
        scrollableTarget="scrollableDiv"
      >
        <Paper
          sx={{
            backgroundColor: "#0f0f0f",
            color: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ padding: 2, borderBottom: "1px solid #303030" }}>
            <Typography variant="h6">Minha Playlist</Typography>
          </Box>
          <VideoList
            videos={videos}
            onVideoSelect={onVideoSelect}
            onVideoDelete={onVideoDelete}
            currentVideoId={currentVideoId}
            isLoading={isLoading}
          />
        </Paper>
      </InfiniteScroll>
    </div>
  );
};

export default PlaylistPanel;

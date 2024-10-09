"use client";
import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { Video } from "@/types";
import VideoList from "../VideoList";
import InfiniteScroll from "react-infinite-scroll-component";
import { useVideos } from "@/hooks/useVideos";
import {
  EmptyPlaylistBox,
  ScrollableDiv,
  StyledPaper,
  StyledTitleBox,
} from "./styles";

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
  const { debouncedFetchNextPage, hasNextPage } = useVideos();

  return (
    <ScrollableDiv id="scrollableDiv">
      <InfiniteScroll
        dataLength={videos.length}
        next={debouncedFetchNextPage}
        hasMore={!!hasNextPage || false}
        loader={
          videos.length > 0 && !!hasNextPage ? (
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : null
        }
        scrollableTarget="scrollableDiv"
      >
        <StyledPaper>
          <StyledTitleBox>
            <Typography variant="h6">Minha Playlist</Typography>
          </StyledTitleBox>
          {(!videos || videos.length === 0) && !isLoading ? (
            <EmptyPlaylistBox>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                Sua playlist está vazia.
              </Typography>
            </EmptyPlaylistBox>
          ) : (
            <VideoList
              videos={videos}
              onVideoSelect={onVideoSelect}
              onVideoDelete={onVideoDelete}
              currentVideoId={currentVideoId}
              isLoading={isLoading}
            />
          )}
        </StyledPaper>
      </InfiniteScroll>
    </ScrollableDiv>
  );
};

export default PlaylistPanel;

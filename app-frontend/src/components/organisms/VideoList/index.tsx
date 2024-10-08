"use client";
import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoThumbnail from "@/components/molecules/VideoThumbnail";
import { Video } from "@/types";

interface VideoListProps {
  videos?: Video[];
  onVideoSelect: (id: string) => void;
  onVideoDelete: (id: string) => void;
  currentVideoId?: string;
  isLoading?: boolean;
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  onVideoSelect,
  onVideoDelete,
  currentVideoId,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <List>
        {Array.from(new Array(5)).map((_, index) => (
          <ListItem key={index}>
            <Skeleton variant="rectangular" width="100%" height={82} />
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <List>
      {videos?.map((video) => (
        <ListItem
          key={video.id}
          disablePadding
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                onVideoDelete(video.id);
              }}
            >
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          }
          sx={{
            backgroundColor:
              video.id === currentVideoId ? "#282828" : "transparent",
            "&:hover": {
              backgroundColor: "#383838",
            },
            transition: "background-color 0.3s ease",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          <ListItemButton onClick={() => onVideoSelect(video.id)}>
            <VideoThumbnail
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default VideoList;

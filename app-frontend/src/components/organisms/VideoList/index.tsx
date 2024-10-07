"use client";
import React from "react";

import { List, ListItem, ListItemButton, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoThumbnail from "@/components/molecules/VideoThumbnail";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface VideoListOrganismProps {
  videos: Video[];
  onVideoSelect: (id: string) => void;
  onVideoDelete: (id: string) => void;
}

const VideoListOrganism: React.FC<VideoListOrganismProps> = ({
  videos,
  onVideoSelect,
  onVideoDelete,
}) => {
  return (
    <List>
      {videos.map((video) => (
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
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemButton onClick={() => onVideoSelect(video.id)}>
            <VideoThumbnail thumbnail={video.thumbnail} title={video.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default VideoListOrganism;

"use client";
import React from "react";
import { List, Skeleton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoThumbnail from "@/components/molecules/VideoThumbnail";
import { Video } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledListItem,
  StyledListItemButton,
  StyledIconButton,
} from "./styles";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedVideoId, setSelectedVideoId] = React.useState<string | null>(
    null
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedVideoId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedVideoId(null);
  };

  if (isLoading) {
    return (
      <List>
        {Array.from(new Array(5)).map((_, index) => (
          <StyledListItem key={index} isSelected={false}>
            <Skeleton variant="rectangular" width="100%" height={82} />
          </StyledListItem>
        ))}
      </List>
    );
  }

  return (
    <>
      <List>
        {videos?.map((video) => (
          <StyledListItem
            key={video.id}
            isSelected={video.id === currentVideoId}
            disablePadding
            secondaryAction={
              <StyledIconButton
                edge="end"
                aria-label="more"
                onClick={(event) => handleMenuClick(event, video.id)}
              >
                <MoreVertIcon />
              </StyledIconButton>
            }
          >
            <StyledListItemButton onClick={() => onVideoSelect(video.id)}>
              <VideoThumbnail
                thumbnail={video.thumbnail}
                title={video.title}
                description={video.description}
              />
            </StyledListItemButton>
          </StyledListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedVideoId) {
              onVideoDelete(selectedVideoId);
            }
            handleMenuClose();
          }}
        >
          <DeleteIcon style={{ marginRight: 8 }} />
          Remover vídeo
        </MenuItem>
      </Menu>
    </>
  );
};

export default VideoList;

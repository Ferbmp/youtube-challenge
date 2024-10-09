"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Header from "@/components/organisms/Header";
import VideoScreen from "@/components/organisms/VideoScreen";
import PlaylistPanel from "@/components/organisms/PlaylistPanel";
import { useVideos } from "@/hooks/useVideos";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    videos,
    addVideo,
    deleteVideo,
    currentVideo,
    setCurrentVideo,
    isLoading,
  } = useVideos();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (searchValue) {
        await addVideo.mutateAsync(searchValue);
        setSearchValue("");
      }
    } catch (error) {
      console.error("Erro ao adicionar vídeo:", error);
    }
  };

  const handleVideoSelect = (id: string) => {
    const selectedVideo = videos?.find((video) => video.id === id);
    setCurrentVideo(selectedVideo || null);
  };

  return (
    <>
      <Header
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <Container maxWidth={false} sx={{ mt: 8, width: "85%", mx: "auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <VideoScreen currentVideo={currentVideo} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PlaylistPanel
              videos={videos || []}
              onVideoSelect={handleVideoSelect}
              onVideoDelete={deleteVideo.mutate}
              currentVideoId={currentVideo?.id || ""}
              isLoading={isLoading && !videos.length}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;

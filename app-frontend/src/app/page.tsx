"use client";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import api from "@/services/api";
import Header from "@/components/organisms/Header";
import VideoScreen from "@/components/organisms/VideoScreen";
import PlaylistPanel from "@/components/organisms/PlaylistPanel";
import isValidYouTubeUrl from "@/utils/youtube_url_validator";
import { Video } from "@/types";

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get<Video[]>("/videos");
      setVideos(response.data);

      setCurrentVideo(response.data.length > 0 ? response.data[0] : null);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidYouTubeUrl(searchValue)) {
      alert("Por favor, insira uma URL válida do YouTube.");
      return;
    }

    try {
      await api.post("/videos", { url: searchValue });
      setSearchValue("");
      fetchVideos();
    } catch (error) {
      console.error("Erro ao adicionar vídeo:", error);
    }
  };

  const handleVideoSelect = (id: string) => {
    const selectedVideo = videos.find((video) => video.id === id);
    setCurrentVideo(selectedVideo || null);
  };

  const handleVideoDelete = async (id: string) => {
    try {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Erro ao deletar vídeo:", error);
    }
  };

  return (
    <div>
      <Header
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {currentVideo ? (
              <VideoScreen currentVideo={currentVideo} />
            ) : (
              <Typography variant="h5">
                Selecione um vídeo para reproduzir
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <PlaylistPanel
              videos={videos}
              onVideoSelect={handleVideoSelect}
              onVideoDelete={handleVideoDelete}
              currentVideoId={currentVideo?.id || ""}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

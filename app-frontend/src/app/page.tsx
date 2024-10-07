"use client";

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import { Container, Typography } from "@mui/material";
import api from "@/services/api";
import Header from "@/components/organisms/Header";
import VideoPlayerOrganism from "@/components/organisms/VideoPlayer";
import VideoListOrganism from "@/components/organisms/VideoList";
import isValidYouTubeUrl from "@/utils/youtube_url_validator";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get<Video[]>("/videos");
      setVideos(response.data);
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

    if (selectedVideo) {
      setCurrentVideoId(selectedVideo.id);
    }
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
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {/* Player de vídeo à esquerda */}
          <Grid xs={12} md={8}>
            {currentVideoId ? (
              <VideoPlayerOrganism videoId={currentVideoId} />
            ) : (
              <Typography variant="h5">
                Selecione um vídeo para reproduzir
              </Typography>
            )}
          </Grid>
          {/* Lista de vídeos à direita */}
          <Grid xs={12} md={4}>
            <VideoListOrganism
              videos={videos}
              onVideoSelect={handleVideoSelect}
              onVideoDelete={handleVideoDelete}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;

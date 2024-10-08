"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/services/api";
import { Video } from "@/types";
import isValidYouTubeUrl from "@/utils/isValidYouTubeUrl";
import debounce from "lodash/debounce";
import { AxiosError } from "axios";

interface VideoPage {
  videos: Video[];
  page: number;
  total_pages: number;
}

export const useVideos = () => {
  const queryClient = useQueryClient();
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const fetchVideos = async ({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<VideoPage> => {
    const response = await api.get(`/videos?page=${pageParam}&per_page=6`);
    const data = response.data;

    return {
      videos: data.videos,
      page: data.page,
      total_pages: data.total_pages,
    };
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<VideoPage, Error>("videos", fetchVideos, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    onSuccess: (data) => {
      if (
        !currentVideo &&
        data.pages.length > 0 &&
        data.pages[0].videos.length > 0
      ) {
        setCurrentVideo(data.pages[0].videos[0]);
      } else if (data.pages.length === 0 || data.pages[0].videos.length === 0) {
        setCurrentVideo(null);
      }
    },
  });

  const throttledFetchNextPage = debounce(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, 800);

  const addVideo = useMutation<void, AxiosError, string>(
    async (url: string) => {
      if (!isValidYouTubeUrl(url)) {
        throw new Error("Por favor, insira uma URL válida do YouTube.");
      }
      await api.post("/videos", { url });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("videos");
        toast.success("Vídeo adicionado com sucesso!");
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            toast.error("Vídeo já existente");
          } else {
            const errorMessage = error.response?.data?.error;
            toast.error(
              `Ocorreu um erro ao adicionar o vídeo: ${
                errorMessage || "Erro desconhecido"
              }`
            );
          }
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Ocorreu um erro desconhecido.");
        }
      },
    }
  );

  const deleteVideo = useMutation<void, AxiosError, string>(
    async (id: string) => {
      await api.delete(`/videos/${id}`);
    },
    {
      onSuccess: (_, id) => {
        toast.success("Vídeo deletado com sucesso!");
        queryClient.invalidateQueries("videos");

        if (currentVideo?.id === id) {
          setCurrentVideo(null);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(`Erro ao deletar o vídeo: ${error.message}`);
      },
    }
  );

  return {
    videos: data?.pages.flatMap((page) => page.videos) || [],
    isLoading,
    isError,
    error,
    addVideo,
    deleteVideo,
    currentVideo,
    setCurrentVideo,
    throttledFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

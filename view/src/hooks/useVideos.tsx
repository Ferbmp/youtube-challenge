"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { Video } from "@/types";
import isValidYouTubeUrl from "@/utils/isValidYouTubeUrl";
import debounce from "lodash/debounce";
import { AxiosError } from "axios";
import { addVideo, deleteVideo, fetchVideos } from "@/services/videoServices";

export const useVideos = () => {
  const queryClient = useQueryClient();
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "videos",
    ({ pageParam = 1 }) => fetchVideos(pageParam),
    {
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
        } else if (
          data.pages.length === 0 ||
          data.pages[0].videos.length === 0
        ) {
          setCurrentVideo(null);
        }
      },
    }
  );

  const debouncedFetchNextPage = debounce(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, 800);

  const addVideoMutation = useMutation<void, AxiosError, string>(
    async (url: string) => {
      if (!isValidYouTubeUrl(url)) {
        throw new Error("Por favor, insira uma URL válida do YouTube.");
      }
      await addVideo(url);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("videos");
        toast.success("Vídeo adicionado com sucesso!");
      },
      onError: (error: Error) => {
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

  const deleteVideoMutation = useMutation<void, AxiosError, string>(
    async (id: string) => {
      await deleteVideo(id);
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
    addVideo: addVideoMutation,
    deleteVideo: deleteVideoMutation,
    currentVideo,
    setCurrentVideo,
    debouncedFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

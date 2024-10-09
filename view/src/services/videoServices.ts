import api from "@/services/api";
import { VideoPage } from "@/types";

export const fetchVideos = async (
  pageParam: number = 1
): Promise<VideoPage> => {
  const response = await api.get("/videos", {
    params: {
      page: pageParam,
      per_page: 5,
    },
  });
  return response.data;
};

export const addVideo = async (url: string): Promise<void> => {
  return api.post("/videos", { url });
};

export const deleteVideo = async (id: string): Promise<void> => {
  return api.delete(`/videos/${id}`);
};

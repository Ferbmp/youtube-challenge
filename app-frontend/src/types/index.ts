export interface Video {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  description: string;
}

export interface VideoPage {
  videos: Video[];
  page: number;
  total_pages: number;
}

import { render, screen } from "@testing-library/react";
import VideoList from ".";
import "@testing-library/jest-dom";
import { Video } from "@/types";

describe("VideoList component", () => {
  const mockOnVideoSelect = jest.fn();
  const mockOnVideoDelete = jest.fn();

  const mockVideos: Video[] = [
    {
      id: "1",
      title: "Video 1",
      description: "Description 1",
      thumbnail: "thumbnail1.jpg",
      url: "https://example.com/video1",
    },
    {
      id: "2",
      title: "Video 2",
      description: "Description 2",
      thumbnail: "thumbnail2.jpg",
      url: "https://example.com/video2",
    },
  ];

  const setup = (isLoading = false, videos = mockVideos) => {
    render(
      <VideoList
        videos={videos}
        onVideoSelect={mockOnVideoSelect}
        onVideoDelete={mockOnVideoDelete}
        currentVideoId="1"
        isLoading={isLoading}
      />
    );
  };

  it("renders the video thumbnails when videos are available", () => {
    setup();

    const videoThumbnail1 = screen.getByText("Video 1");
    const videoThumbnail2 = screen.getByText("Video 2");

    expect(videoThumbnail1).toBeInTheDocument();
    expect(videoThumbnail2).toBeInTheDocument();
  });

  it("renders loading skeletons when loading", () => {
    setup(true);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBe(5);
  });
});

import { render, screen } from "@testing-library/react";
import PlaylistPanel from ".";
import "@testing-library/jest-dom";
import { Video } from "@/types";

jest.mock("@/hooks/useVideos", () => ({
  useVideos: () => ({
    debouncedFetchNextPage: jest.fn(),
    hasNextPage: false,
  }),
}));

jest.mock("../VideoList", () => ({
  __esModule: true,
  default: () => <div>VideoList Mock</div>,
}));

describe("PlaylistPanel component", () => {
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

  const setup = (videos = mockVideos, isLoading = false) => {
    render(
      <PlaylistPanel
        videos={videos}
        onVideoSelect={mockOnVideoSelect}
        onVideoDelete={mockOnVideoDelete}
        currentVideoId="1"
        isLoading={isLoading}
      />
    );
  };

  it("renders the playlist title", () => {
    setup();

    const titleElement = screen.getByText("Minha Playlist");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the empty playlist message when there are no videos and not loading", () => {
    setup([], false);

    const emptyMessage = screen.getByText(/sua playlist está vazia/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it("does not show the empty playlist message when videos are available", () => {
    setup(mockVideos);

    const emptyMessage = screen.queryByText(/sua playlist está vazia/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it("renders the VideoList component when videos are available", () => {
    setup(mockVideos);

    const videoListMock = screen.getByText("VideoList Mock");
    expect(videoListMock).toBeInTheDocument();
  });
});

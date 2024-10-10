import { render, screen } from "@testing-library/react";
import VideoPlayer from ".";
import "@testing-library/jest-dom";
import { YouTubeProps } from "react-youtube";

interface MockYouTubeProps extends YouTubeProps {
  videoId: string;
}

jest.mock("react-youtube", () => ({
  __esModule: true,
  default: (props: MockYouTubeProps) => (
    <div data-testid="youtube-player">YouTube Player - {props.videoId}</div>
  ),
}));

describe("VideoPlayer component", () => {
  it("renders the YouTube player with the correct videoId", () => {
    const videoId = "test-video-id";
    render(<VideoPlayer videoId={videoId} />);

    const playerElement = screen.getByTestId("youtube-player");
    expect(playerElement).toBeInTheDocument();
    expect(playerElement).toHaveTextContent("YouTube Player - test-video-id");
  });
});

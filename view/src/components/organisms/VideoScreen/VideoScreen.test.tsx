import { render, screen } from "@testing-library/react";
import VideoScreen from ".";
import "@testing-library/jest-dom";

jest.mock("../VideoPlayer", () => ({
  __esModule: true,
  default: (props: { videoId: string }) => (
    <div data-testid="video-player">VideoPlayer - {props.videoId}</div>
  ),
}));

jest.mock("../VideoDescription", () => ({
  __esModule: true,
  default: (props: { title: string; description: string }) => (
    <div data-testid="video-description">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  ),
}));

const mockVideo = {
  id: "test-video-id",
  title: "Test Video Title",
  description: "Test Video Description",
  url: "https://example.com/video",
  thumbnail: "https://example.com/thumbnail.jpg",
};

describe("VideoScreen component", () => {
  it("renders VideoPlayer and VideoDescription when currentVideo is provided", () => {
    render(<VideoScreen currentVideo={mockVideo} />);

    const playerElement = screen.getByTestId("video-player");
    expect(playerElement).toBeInTheDocument();
    expect(playerElement).toHaveTextContent("VideoPlayer - test-video-id");

    const descriptionElement = screen.getByTestId("video-description");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent("Test Video Title");
    expect(descriptionElement).toHaveTextContent("Test Video Description");
  });
});

import { render, screen } from "@testing-library/react";
import VideoThumbnail from ".";
import "@testing-library/jest-dom";

describe("VideoThumbnail component", () => {
  const mockProps = {
    thumbnail: "https://example.com/thumbnail.jpg",
    title: "Sample Video",
    description: "This is a sample video description",
  };

  it("renders the video thumbnail image with alt text", () => {
    render(<VideoThumbnail {...mockProps} />);

    const imageElement = screen.getByRole("img", { name: mockProps.title });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockProps.thumbnail);
    expect(imageElement).toHaveAttribute("alt", mockProps.title);
  });

  it("renders the video title", () => {
    render(<VideoThumbnail {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the video description", () => {
    render(<VideoThumbnail {...mockProps} />);

    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("truncates the video description with noWrap", () => {
    render(<VideoThumbnail {...mockProps} />);

    const descriptionElement = screen.getByText(mockProps.description);
    expect(descriptionElement).toHaveStyle("text-overflow: ellipsis");
  });
});

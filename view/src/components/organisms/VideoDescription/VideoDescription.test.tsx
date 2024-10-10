import { render, screen } from "@testing-library/react";
import VideoDescription from ".";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("VideoDescription component", () => {
  const mockTitle = "Sample Video Title";
  const mockDescription = "This is a sample description for the video.";

  it("renders the title", () => {
    render(
      <VideoDescription title={mockTitle} description={mockDescription} />
    );

    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the accordion with description label", () => {
    render(
      <VideoDescription title={mockTitle} description={mockDescription} />
    );

    const accordionLabel = screen.getByText(/descrição:/i);
    expect(accordionLabel).toBeInTheDocument();
  });

  it("renders the description in the accordion when expanded", async () => {
    render(
      <VideoDescription title={mockTitle} description={mockDescription} />
    );

    const accordionLabel = screen.getByText(/descrição:/i);
    expect(accordionLabel).toBeInTheDocument();

    const expandButton = screen.getByRole("button", { name: /descrição:/i });
    await userEvent.click(expandButton);

    const descriptionElement = screen.getByText(mockDescription);
    expect(descriptionElement).toBeInTheDocument();
  });
});

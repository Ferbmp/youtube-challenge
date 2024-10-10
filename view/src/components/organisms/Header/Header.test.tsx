import { render, screen, fireEvent } from "@testing-library/react";
import Header from ".";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Header component", () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSearchSubmit = jest.fn((e) => e.preventDefault());

  const setup = (searchValue = "") => {
    render(
      <Header
        searchValue={searchValue}
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );
  };

  it("renders the search bar with the provided value", () => {
    setup("search term");

    const inputElement = screen.getByPlaceholderText(
      /insira a url do youtube/i
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("search term");
  });

  it("calls onSearchChange when typing in the search bar", async () => {
    setup();

    const inputElement = screen.getByPlaceholderText(
      /insira a url do youtube/i
    );
    await userEvent.type(inputElement, "new search term");

    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  it("calls onSearchSubmit when the search form is submitted", async () => {
    setup("search term");

    const submitButton = screen.getByRole("button", { name: /Adicionar/i });
    fireEvent.click(submitButton);

    expect(mockOnSearchSubmit).toHaveBeenCalled();
  });
});

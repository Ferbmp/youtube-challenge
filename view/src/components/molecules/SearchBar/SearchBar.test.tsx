import { render, screen } from "@testing-library/react";
import SearchBar from ".";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("SearchBar component", () => {
  const mockOnSubmit = jest.fn((e) => e.preventDefault());

  it("renders the SearchBar with placeholder text", () => {
    render(<SearchBar value="" onChange={() => {}} onSubmit={mockOnSubmit} />);

    const inputElement = screen.getByPlaceholderText(
      /Insira a URL do YouTube/i
    );
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange when typing in the input field", async () => {
    const Wrapper = () => {
      const [value, setValue] = useState("");
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

      return (
        <SearchBar
          value={value}
          onChange={handleChange}
          onSubmit={mockOnSubmit}
        />
      );
    };

    render(<Wrapper />);

    const inputElement = screen.getByPlaceholderText(
      /Insira a URL do YouTube/i
    );
    await userEvent.type(inputElement, "https://youtube.com");

    expect(inputElement).toHaveValue("https://youtube.com");
  });

  it("disables the submit button when input is empty", () => {
    render(<SearchBar value="" onChange={() => {}} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /Adicionar/i });
    expect(submitButton).toBeDisabled();
  });

  it("enables the submit button when input is not empty", () => {
    render(
      <SearchBar
        value="https://youtube.com"
        onChange={() => {}}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole("button", { name: /Adicionar/i });
    expect(submitButton).toBeEnabled();
  });

  it("calls onSubmit when the form is submitted", async () => {
    render(
      <SearchBar
        value="https://youtube.com"
        onChange={() => {}}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole("button", { name: /Adicionar/i });

    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import TextField from ".";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("TextField component", () => {
  it("renders the TextField with placeholder text", () => {
    render(<TextField placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText(/enter text/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("allows the user to type into the TextField", async () => {
    render(<TextField placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText(/enter text/i);

    await userEvent.type(inputElement, "Hello World");

    expect(inputElement).toHaveValue("Hello World");
  });

  it("triggers onChange when typing", async () => {
    const handleChange = jest.fn();
    render(<TextField placeholder="Enter text" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText(/enter text/i);

    await userEvent.type(inputElement, "Hello");

    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue("Hello");
  });

  it("applies the provided MUI props correctly", () => {
    render(<TextField variant="outlined" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("MuiOutlinedInput-input");
  });
});

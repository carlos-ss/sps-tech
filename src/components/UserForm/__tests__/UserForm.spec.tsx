import { act, render, screen } from "@testing-library/react";
import userevent from "@testing-library/user-event";
import { UserForm } from "../UserForm";
import { vi } from "vitest";

describe("UserForm", () => {
  const handleDataSubmit = vi.fn();
  it("renders form with inputs", () => {
    render(<UserForm onDataSubmit={handleDataSubmit} />);

    // Check if all input fields are rendered
    expect(screen.getByLabelText("Email label")).toBeInTheDocument();
    expect(screen.getByLabelText("Password label")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember-me checkbox")).toBeInTheDocument();
  });

  it("should submit form with data", async () => {
    render(<UserForm onDataSubmit={handleDataSubmit} />);

    // Simulate user input
    await userevent.type(
      screen.getByLabelText("Email input"),
      "test@example.com"
    );
    await userevent.type(screen.getByLabelText("Password input"), "password");
    await userevent.click(screen.getByLabelText("Remember-me checkbox"));

    // Submit the form
    await userevent.click(screen.getByRole("button", { name: /submit/i }));

    // Check if the handleSubmit function was called with the correct data
    expect(handleDataSubmit).toHaveBeenCalledWith({
      username: "test@example.com",
      password: "password",
      remember: true,
    });
  });

  it("shows validation errors when inputs are empty", async () => {
    const handleSubmit = vi.fn();
    render(<UserForm onDataSubmit={handleSubmit} />);

    // Submit the form without filling in the inputs
    await userevent.click(screen.getByRole("button", { name: /submit/i }));

    // Check if validation errors are displayed
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();

    // Check if the handleSubmit function was not called
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

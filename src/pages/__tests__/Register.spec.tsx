import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterPage } from "../Register";
import { vi } from "vitest";
import { useGet, usePost } from "@/hooks/request";

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(),
  usePost: vi.fn(),
}));

const mockUseGet = useGet as jest.Mock;
const mockUsePost = usePost as jest.Mock;

describe("RegisterPage", () => {
  beforeEach(() => {
    mockUseGet.mockReturnValue({
      data: [
        { id: 1, username: "user1" },
        { id: 2, username: "user2" },
      ],
    });
    mockUsePost.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it("renders the RegisterPage component", () => {
    render(<RegisterPage />);

    // Check if all elements are rendered
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByLabelText("Email input")).toBeInTheDocument();
    expect(screen.getByLabelText("Password input")).toBeInTheDocument();
  });

  it("submits the form and displays success message", async () => {
    //set up mock mutate function
    const mockMutate = vi.fn((data, { onSuccess }) => onSuccess({ id: 3 }));
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    render(<RegisterPage />);

    // Simulate user input
    await userEvent.type(
      screen.getByLabelText("User name input"),
      "test-username"
    );

    await userEvent.type(
      screen.getByLabelText("Email input"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password input"), "password");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // validate if the
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          username: "test-username",
          email: "test@example.com",
          password: "password",
          id: 3,
        },
        expect.any(Object)
      );
    });

    expect(
      screen.getByText("User created successfully; New ID: 3")
    ).toBeInTheDocument();
  });

  it("submits the form and displays error message", async () => {
    //set up mock mutate function
    const mockMutate = vi.fn((data, { onError }) =>
      onError({ message: "Error" })
    );
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    render(<RegisterPage />);

    // Simulate user input
    await userEvent.type(
      screen.getByLabelText("User name input"),
      "test-username"
    );
    await userEvent.type(
      screen.getByLabelText("Email input"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password input"), "password");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // wiat for the function to have been called
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          username: "test-username",
          email: "test@example.com",
          password: "password",
          id: 3,
        },
        expect.any(Object)
      );
    });

    // validate if the error message is displayed
    expect(screen.getByText("Failed to create User")).toBeInTheDocument();
  });
});

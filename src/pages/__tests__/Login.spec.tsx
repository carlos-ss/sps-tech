import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../Login";
import { vi } from "vitest";
import { usePost } from "@/hooks/request";
import Cookies from "js-cookie";

vi.mock("@/hooks/request", () => ({
  usePost: vi.fn(),
}));

const mockUsePost = usePost as jest.Mock;

describe("LoginPage", () => {
  beforeEach(() => {
    mockUsePost.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it("renders the LoginPage component", () => {
    render(<LoginPage />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email input")).toBeInTheDocument();
    expect(screen.getByLabelText("Password input")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember-me checkbox")).toBeInTheDocument();
  });

  it("submits the form and displays success message", async () => {
    const mockMutate = vi.fn((data, { onSuccess }) =>
      onSuccess({ token: "test-token" })
    );
    mockUsePost.mockReturnValue({ mutate: mockMutate });
    const cookieSpy = vi.spyOn(Cookies, "set");
    render(<LoginPage />);

    await userEvent.type(
      screen.getByLabelText("Email input"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password input"), "password");
    await userEvent.click(screen.getByLabelText("Remember-me checkbox"));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          username: "test@example.com",
          password: "password",
          remember: true,
        },
        expect.any(Object) // onSuccess and onError callbacks
      );
    });

    expect(cookieSpy).toHaveBeenCalledWith("token", "test-token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  });

  it("submits the form and displays error message", async () => {
    const mockMutate = vi.fn((data, { onError }) =>
      onError({ message: "This error message" })
    );
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    render(<LoginPage />);

    await userEvent.type(
      screen.getByLabelText("Email input"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password input"), "password");
    await userEvent.click(screen.getByLabelText("Remember-me checkbox"));
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          username: "test@example.com",
          password: "password",
          remember: true,
        },
        expect.any(Object)
      );
    });
    screen.debug();
    expect(screen.getByText("This error message")).toBeInTheDocument();
  });
});

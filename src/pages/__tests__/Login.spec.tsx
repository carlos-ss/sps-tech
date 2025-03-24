import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../Login";
import { vi } from "vitest";
import { usePost } from "@/hooks/request";
import Cookies from "js-cookie";
import { MemoryRouter } from "react-router";
import { jwtDecode } from "jwt-decode";

vi.mock("@/hooks/request", () => ({
  usePost: vi.fn(),
}));
vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(),
}));

const mockUsePost = usePost as jest.Mock;
const mockJwtDecode = jwtDecode as jest.Mock;

describe("LoginPage", () => {
  beforeEach(() => {
    mockUsePost.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it("renders the LoginPage component", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("User name input")).toBeInTheDocument();
    expect(screen.getByLabelText("Password input")).toBeInTheDocument();
    expect(screen.getByLabelText("Remember-me checkbox")).toBeInTheDocument();
  });

  it("submits the form and displays success message", async () => {
    const mockMutate = vi.fn((data, { onSuccess }) =>
      onSuccess({ token: "test-token" })
    );
    mockJwtDecode.mockReturnValue({ sub: 1, user: "testuser", iat: 123456 });

    mockUsePost.mockReturnValue({ mutate: mockMutate });
    const cookieSpy = vi.spyOn(Cookies, "set");
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(
      screen.getByLabelText("User name input"),
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
      secure: true,
      sameSite: "strict",
    });
  });

  it("submits the form and displays error message", async () => {
    const mockMutate = vi.fn((data, { onError }) =>
      onError({ message: "This error message" })
    );
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await userEvent.type(
      screen.getByLabelText("User name input"),
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

    expect(screen.getByText("This error message")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { HomePage } from "../Home";
import { vi } from "vitest";
import { useGet } from "@/hooks/request";
import { useStore } from "@/store";
import { MemoryRouter } from "react-router";

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(),
}));

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const mockUseGet = useGet as jest.Mock;
const mockUseStore = useStore as jest.Mock;

describe("HomePage", () => {
  beforeEach(() => {
    mockUseGet.mockReturnValue({
      data: [
        {
          userId: 1,
          products: [{ id: 1, quantity: 2 }],
        },
      ],
    });

    mockUseStore.mockReturnValue({
      user: { id: 1, username: "Test User" },
      setCart: vi.fn(),
    });
  });

  it("renders the HomePage component and displays existing cart message", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome back, Test User!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "You have an existing cart. Continue shopping to add more items to your cart."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /continue shopping/i })
    ).toBeInTheDocument();
  });

  it("renders the HomePage component and displays start shopping message", () => {
    mockUseGet.mockReturnValueOnce({
      data: [],
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Welcome, Test User!")).toBeInTheDocument();
    expect(
      screen.getByText("Start shopping to create your first cart.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /start shopping/i,
      })
    ).toBeInTheDocument();
  });
});

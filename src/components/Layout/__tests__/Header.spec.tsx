import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { vi } from "vitest";
import { userStore } from "@/store";

vi.mock("@/store", () => ({
  userStore: vi.fn(),
}));
const mockUserStore = (loggedIn: boolean) => {
  (userStore as vi.Mock).mockImplementation(() => ({
    loggedIn,
    setLoggedIn: vi.fn(),
  }));
};

describe("Header", () => {
  it("renders 'Log in to shop' when the user is not logged in", () => {
    mockUserStore(false);

    render(<Header />);

    expect(screen.getByText("Log in to shop")).toBeInTheDocument();
  });
  it("renders 'Welcome to shop' when the user is logged in", () => {
    mockUserStore(true);

    render(<Header />);

    expect(screen.getByText("Welcome to shop")).toBeInTheDocument();
  });
});

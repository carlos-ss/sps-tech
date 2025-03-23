import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
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

describe("Footer", () => {
  it("renders 'Login link or create account link' when the user is not logged in", () => {
    mockUserStore(false);

    render(<Footer />);

    expect(
      screen.getByText("Login link or create account link")
    ).toBeInTheDocument();
  });

  it("renders 'Shop links' when the user is logged in", () => {
    mockUserStore(true);

    render(<Footer />);

    expect(screen.getByText("Shop links")).toBeInTheDocument();
  });
});

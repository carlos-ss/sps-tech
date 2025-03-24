import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { vi } from "vitest";
import { userStore } from "@/store";
import userEvent from "@testing-library/user-event";

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
  describe("when menu is mobile", () => {
    beforeEach(() => {});
    it("renders 'Login' when the user is not logged in and menu is open", async () => {
      mockUserStore(false);
      render(<Header isMobile={true} />);

      const toggleButton = screen.getByLabelText("Toggle menu outside drawer");
      await userEvent.click(toggleButton);

      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders 'Cart' link when the user is logged in and menu is open", async () => {
      mockUserStore(true);
      render(<Header isMobile={true} />);

      const toggleButton = screen.getByLabelText("Toggle menu outside drawer");
      await userEvent.click(toggleButton);

      expect(screen.getByText("Cart")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("should close the menu when the user clicks on the close button from within", async () => {
      mockUserStore(true);
      render(<Header isMobile={true} />);

      const toggleButton = screen.getByLabelText("Toggle menu outside drawer");
      await userEvent.click(toggleButton);
      expect(screen.getByText("Cart")).toBeInTheDocument();

      const closeButton = screen.getByLabelText("Toggle menu inside drawer");
      await userEvent.click(closeButton);

      expect(screen.queryByText("Cart")).not.toBeInTheDocument();
    });
  });
  describe("when menu is desktop", () => {
    it("renders 'Login' link when the user is not logged in", () => {
      mockUserStore(false);

      render(<Header isMobile={false} />);

      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    it("renders 'Cart' options when the user is logged in", () => {
      mockUserStore(true);

      render(<Header isMobile={false} />);

      expect(screen.getByText("Cart")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
  });
});

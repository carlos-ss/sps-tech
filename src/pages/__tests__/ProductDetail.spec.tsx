import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDetailPage } from "../ProductDetail";
import { vi } from "vitest";
import { useGet } from "@/hooks/request";
import { MemoryRouter } from "react-router";

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(),
}));

const mockUseGet = useGet as jest.Mock;

describe("ProductDetailPage", () => {
  beforeEach(() => {
    mockUseGet.mockReturnValue({
      data: {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "Description 1",
        category: "Category 1",
        image: "https://via.placeholder.com/150",
        rating: {
          rate: 4.5,
          count: 10,
        },
      },
    });
  });

  it("renders the ProductDetailPage component and displays product details", () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <ProductDetailPage />
      </MemoryRouter>
    );
    screen.logTestingPlaygroundURL();
    expect(screen.getByText(/product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10\.00/i)).toBeInTheDocument();
    expect(screen.getByText("Category: Category 1")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("10 reviews")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  // TODO
  it.skip("handles 'Add to Cart' button click", async () => {
    const mockAddToCart = vi.fn();
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <ProductDetailPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));
  });
});

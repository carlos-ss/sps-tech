import { render, screen } from "@testing-library/react";
import { CartPage } from "../Cart";
import { vi } from "vitest";
import { useGet } from "@/hooks/request";
import { useStore } from "@/store";

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(),
}));

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const mockUseGet = useGet as jest.Mock;
// type cohesion issue with persistent zustand
const mockUseStore = useStore as unknown as jest.Mock;

describe("CartPage", () => {
  beforeEach(() => {
    mockUseGet.mockReturnValue({
      data: [
        {
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
        {
          id: 2,
          title: "Product 2",
          price: 20,
          description: "Description 2",
          category: "Category 2",
          image: "https://via.placeholder.com/150",
          rating: {
            rate: 4.0,
            count: 5,
          },
        },
      ],
    });

    mockUseStore.mockReturnValue({
      cart: {
        products: [
          { productId: 1, quantity: 3 },
          { productId: 2, quantity: 1 },
        ],
      },
    });
  });

  it("renders the CartPage component and displays empty cart message", () => {
    mockUseStore.mockReturnValueOnce({
      cart: { products: [] },
    });

    render(<CartPage />);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders the CartPage component and displays cart items", () => {
    render(<CartPage />);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 3")).toBeInTheDocument();
    expect(screen.getByText("Price: $10.00")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Price: $20.00")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Total: $50.00")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i })
    ).toBeInTheDocument();
  });
});

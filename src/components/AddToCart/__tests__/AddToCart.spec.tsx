import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartButton } from "../AddToCart";
import { vi } from "vitest";
import { useGet, usePost, usePut } from "@/hooks/request";
import { useStore } from "@/store";
import { IProduct } from "@/types/Product";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(),
  usePost: vi.fn(),
  usePut: vi.fn(),
}));

vi.mock("@/store", () => ({
  useStore: vi.fn(),
}));

const mockUseGet = useGet as jest.Mock;
const mockUsePost = usePost as jest.Mock;
const mockUsePut = usePut as jest.Mock;
const mockUseStore = useStore as unknown as jest.Mock;

const queryclient = new QueryClient();
const product: IProduct = {
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
};

const localRender = () => {
  render(
    <QueryClientProvider client={queryclient}>
      <AddToCartButton product={product} />
    </QueryClientProvider>
  );
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    mockUseGet.mockReturnValue({
      data: [
        {
          id: 1,
          userId: 1,
          products: [{ id: 1, quantity: 2 }],
        },
      ],
    });
    mockUseStore.mockReturnValue({
      user: { id: 1, username: "Test User" },
      cart: { id: 1, userId: 1, products: [{ id: 1, quantity: 2 }] },
      setCart: vi.fn(),
    });
    mockUsePost.mockReturnValue({
      mutate: vi.fn(),
    });

    mockUsePut.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it("renders the AddToCartButton component", () => {
    localRender();

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("handles adding a product to the cart and displays success message", async () => {
    mockUseStore.mockReturnValue({
      user: { id: 1, username: "Test User" },
      cart: null,
      setCart: vi.fn(),
    });
    const mockMutate = vi.fn((body, { onSuccess }) => onSuccess([]));
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    localRender();

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: 2, // Assuming the new cart id is 2
          products: [product],
          userId: 1,
        },
        expect.any(Object)
      );
    });

    expect(screen.getByText("Product added to cart")).toBeInTheDocument();
  });

  it("handles adding a product to the cart and displays error message", async () => {
    mockUseStore.mockReturnValue({
      user: { id: 1, username: "Test User" },
      cart: null,
      setCart: vi.fn(),
    });

    const mockMutate = vi.fn((body, { onError }) =>
      onError({ message: "Failed to add product to cart" })
    );
    mockUsePost.mockReturnValue({ mutate: mockMutate });

    localRender();

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: 2, // Assuming the new cart id is 2
          products: [product],
          userId: 1,
        },
        expect.any(Object)
      );
    });

    expect(
      screen.getByText("Failed to add product to cart")
    ).toBeInTheDocument();
  });

  it("handles updating the cart and displays success message", async () => {
    const mockMutate = vi.fn((body, { onSuccess }) => onSuccess([]));
    mockUsePut.mockReturnValue({ mutate: mockMutate });

    localRender();

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: 1,
          products: [{ id: 1, quantity: 2 }, product],
          userId: 1,
        },
        expect.any(Object)
      );
    });

    expect(screen.getByText("Product added to cart")).toBeInTheDocument();
  });

  it("handles updating the cart and displays error message", async () => {
    const mockMutate = vi.fn((body, { onError }) =>
      onError({ message: "Failed to add product to cart" })
    );
    mockUsePut.mockReturnValue({ mutate: mockMutate });

    localRender();

    await userEvent.click(screen.getByRole("button", { name: /add to cart/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: 1,
          products: [{ id: 1, quantity: 2 }, product],
          userId: 1,
        },
        expect.any(Object)
      );
    });

    expect(
      screen.getByText("Failed to add product to cart")
    ).toBeInTheDocument();
  });
});

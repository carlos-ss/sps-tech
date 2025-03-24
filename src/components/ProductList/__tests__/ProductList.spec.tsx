import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductList } from "../ProductList";
import { vi } from "vitest";
import { IProduct } from "@/types/Product";

const mockProducts: IProduct[] = [
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
      rate: 3.5,
      count: 5,
    },
  },
  // Add more mock products as needed
];

vi.mock("@/hooks/request", () => ({
  useGet: vi.fn(() => ({ data: mockProducts })),
}));

describe("ProductList", () => {
  it("renders the product list with all elements", () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={5}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("filters products based on category", () => {
    render(
      <ProductList
        filters={{
          category: "Category 1",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={5}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });

  it("sorts products based on price in ascending order", () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={5}
      />
    );

    const productPrices = screen
      .getAllByText(/\$\d+\.\d{2}/)
      .map((el) => el.textContent);
    expect(productPrices).toEqual(["$10.00", "$20.00"]);
  });

  it("sorts products based on price in descending order", () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "desc",
        }}
        itemsPerPage={5}
      />
    );

    const productPrices = screen
      .getAllByText(/\$\d+\.\d{2}/)
      .map((el) => el.textContent);
    expect(productPrices).toEqual(["$20.00", "$10.00"]);
  });

  it("paginates products correctly", async () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={1}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();

    await userEvent.click(screen.getByText("Next"));

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("disables previous button on the first page", () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={1}
      />
    );

    expect(screen.getByLabelText("Previous button")).toBeDisabled();
  });

  it("disables next button on the last page", async () => {
    render(
      <ProductList
        filters={{
          category: "",
          priceFrom: "",
          priceTo: "",
          rating: 0,
          sortOrder: "asc",
        }}
        itemsPerPage={1}
      />
    );

    await userEvent.click(screen.getByLabelText("Next button"));

    expect(screen.getByLabelText("Next button")).toBeDisabled();
  });
});

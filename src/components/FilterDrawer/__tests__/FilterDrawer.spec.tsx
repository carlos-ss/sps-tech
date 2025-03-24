import { render, screen } from "@testing-library/react";
import { FilterDrawer } from "../FilterDrawer";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("FilterDrawer", () => {
  const mockOnFilterChange = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnClose.mockClear();
  });

  it("renders the filter drawer with all elements", () => {
    render(
      <FilterDrawer
        open={true}
        onClose={mockOnClose}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(
      screen.getByText("Filter by category: All Categories")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Filter by rating: All Ratings")
    ).toBeInTheDocument();
    expect(screen.getByText("Sort by price: asc")).toBeInTheDocument();
    expect(screen.getByText("Price From")).toBeInTheDocument();
    expect(screen.getByText("Price To")).toBeInTheDocument();
  });

  it("calls onFilterChange with the correct values when filters are changed", async () => {
    render(
      <FilterDrawer
        open={true}
        onClose={mockOnClose}
        onFilterChange={mockOnFilterChange}
      />
    );

    // category filter
    await userEvent.click(screen.getByLabelText("Filter by category"));
    await userEvent.click(screen.getByText("men's clothing"));

    // rating filter
    await userEvent.click(screen.getByLabelText("Filter by rating"));
    await userEvent.click(screen.getByText("3 star"));

    // sort order filter
    await userEvent.click(screen.getByLabelText("Sort by price"));
    await userEvent.click(screen.getByText("Descending"));

    await userEvent.type(screen.getByLabelText("Price from input"), "10");
    await userEvent.type(screen.getByLabelText("Price to input"), "100");

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: "men's clothing",
      priceFrom: "10",
      priceTo: "100",
      rating: 3,
      sortOrder: "desc",
    });
  });

  it("calls onClose when the drawer is closed", async () => {
    render(
      <FilterDrawer
        open={true}
        onClose={mockOnClose}
        onFilterChange={mockOnFilterChange}
      />
    );

    await userEvent.click(screen.getByLabelText("Close"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});

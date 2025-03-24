import { IProductFilterDrawerProps } from "@/types/Product";
import { Drawer, Dropdown, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";

import { HiX } from "react-icons/hi";

type InputEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;
const CATEGORY_OPTIONS = [
  "men's clothing",
  "jewelery",
  "electronics",
  "women's clothing",
];

export const FilterDrawer = ({
  open,
  onClose,
  onFilterChange,
}: IProductFilterDrawerProps) => {
  const [category, setCategory] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [rating, setRating] = useState(0);

  const [sortOrder, setSortOrder] = useState("asc");

  const handlePriceFromChange: InputEvent = (event) =>
    setPriceFrom(event.target.value);
  const handlePriceToChange: InputEvent = (event) =>
    setPriceTo(event.target.value);

  const handleRatingChange = (rating: number) => setRating(rating);
  const handleCategoryChange = (category: string) => setCategory(category);

  const handleSortOrderChange = (order: string) => setSortOrder(order);
  useEffect(() => {
    onFilterChange({ category, priceFrom, priceTo, rating, sortOrder });
  }, [category, priceFrom, priceTo, rating, sortOrder, onFilterChange]);

  return (
    <Drawer
      position="right"
      onClose={onClose}
      open={open}
      className="flex flex-col gap-y-3"
    >
      <div className="flex justify-end">
        <button onClick={onClose} aria-label="Close">
          <HiX size={30} />
        </button>
      </div>
      <div>
        <Dropdown
          aria-label="Filter by category"
          label={`Filter by category: ${
            category ? category : "All Categories"
          }`}
        >
          {CATEGORY_OPTIONS.map((category) => (
            <Dropdown.Item
              aria-label={category}
              className="capitalize"
              key={category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Dropdown.Item>
          ))}

          <Dropdown.Item
            aria-label="All categories"
            onClick={() => handleCategoryChange("")}
          >
            All Categories
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <Dropdown
          aria-label="Filter by rating"
          label={`Filter by rating: ${
            rating === 0 ? "All Ratings" : rating + " star"
          }`}
        >
          {[...Array(5)].map((_, index) => {
            return (
              <Dropdown.Item
                aria-label={index + 1 + "star"}
                key={index + 1 + "star"}
                onClick={() => handleRatingChange(index + 1)}
              >
                {index + 1} star
              </Dropdown.Item>
            );
          })}
          <Dropdown.Item
            aria-label="all ratings"
            onClick={() => handleRatingChange(0)}
          >
            All Ratings
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <Dropdown
          aria-label="Sort by price"
          label={`Sort by price: ${sortOrder}`}
        >
          <Dropdown.Item
            aria-label="Ascending"
            onClick={() => handleSortOrderChange("asc")}
          >
            Ascending
          </Dropdown.Item>
          <Dropdown.Item
            aria-label="Descending"
            onClick={() => handleSortOrderChange("desc")}
          >
            Descending
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <label className="block text-sm font-medium ">Price From</label>
        <TextInput
          aria-label="Price from input"
          placeholder="$ 0.00"
          onChange={handlePriceFromChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium ">Price To</label>
        <TextInput
          aria-label="Price to input"
          placeholder="$ 0.00"
          onChange={handlePriceToChange}
        />
      </div>
    </Drawer>
  );
};

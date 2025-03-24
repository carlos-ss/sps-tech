import FilterDrawer from "@/components/FilterDrawer";
import ProductList from "@/components/ProductList";
import { IProductFilter } from "@/types/Product";
import { Button, Dropdown } from "flowbite-react";
import { useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";

export const ProductsPage = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [filter, setFilter] = useState<IProductFilter>({
    category: "",
    priceFrom: "",
    priceTo: "",
    rating: 0,
    sortOrder: "asc",
  });

  const handleItemsPerPageChange = (items: number) => setItemsPerPage(items);
  const handleFilterToggle = () => setFilterIsOpen(!filterIsOpen);

  return (
    <div className=" container flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <div className="flex gap-x-2">
          <Dropdown label={`Items per page: ${itemsPerPage}`}>
            {[5, 10, 15, 20].map((items) => (
              <Dropdown.Item
                key={items}
                onClick={() => handleItemsPerPageChange(items)}
              >
                {items}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Button outline onClick={handleFilterToggle}>
            <HiOutlineFilter className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="flex-grow">
        <ProductList filters={filter} itemsPerPage={itemsPerPage} />
      </div>
      <FilterDrawer
        onClose={handleFilterToggle}
        open={filterIsOpen}
        onFilterChange={(filterData) => setFilter(filterData)}
      />
    </div>
  );
};

import { urls } from "@/api";
import { useGet } from "@/hooks/request";
import { IProduct, IProductListPros } from "@/types/Product";
import { Button, Rating } from "flowbite-react";
import { useState } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";

export const ProductList = ({
  filters: { category, priceFrom, priceTo, rating, sortOrder },
  itemsPerPage,
}: IProductListPros) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products } = useGet<IProduct[]>(
    "all-products",
    urls.products.all
  );
  // If products are not loaded yet, show loading message | can't do anything until data is loaded
  if (!products) return <div>Loading...</div>;

  // will change rendered data based on filters
  const filteredProducts = products.filter((product) => {
    return (
      (category === "" || product.category === category) &&
      (priceFrom === "" || product.price >= parseFloat(priceFrom)) &&
      (priceTo === "" || product.price <= parseFloat(priceTo)) &&
      (rating === 0 || product.rating.rate > rating)
    );
  });

  // will sort producs based on price
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // handles rendering of products based on pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // updates current page to load nex or previous products
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-full">
      {paginatedProducts.length === 0 ? (
        <div className="text-center text-2xl font-bold h-full">
          No products found with filter parameters
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map(({ id, image, title, price, rating }) => (
              <div
                key={id}
                className="border p-4 rounded-lg shadow-md grid grid-cols-1 gap-y-1"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover"
                />

                <h2 className="text-xl font-bold">{title}</h2>
                <p>${price.toFixed(2)}</p>
                <div className="flex items-center ">
                  <Rating>
                    {[...Array(5)].map((_, index) => (
                      <Rating.Star
                        key={index + rating.rate}
                        filled={index < rating.rate}
                      />
                    ))}
                    <p className="ml-2 text-sm font-bold  text-white">
                      {rating.rate.toFixed(1)}
                    </p>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                    <a
                      href="#"
                      className="text-sm font-medium  underline hover:no-underline text-white"
                    >
                      {rating.count} reviews
                    </a>
                  </Rating>
                </div>

                <div className="flex justify-end self-end">
                  <Button color="blue">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              onClick={handlePreviousPage}
              aria-label="Previous button"
              disabled={currentPage === 1}
              className="flex items-center"
            >
              <HiOutlineChevronLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              aria-label="Next button"
              disabled={currentPage === totalPages}
            >
              Next <HiOutlineChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

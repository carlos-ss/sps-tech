import { urls } from "@/api";

import { useGet } from "@/hooks/request";
import { IProduct } from "@/types/Product";
import { Button, Rating } from "flowbite-react";
import { useParams } from "react-router";

export const ProductDetailPage = () => {
  const id = useParams<{ id: string }>().id ?? "";

  const { data: product } = useGet<IProduct>(
    `product-${id}`,
    urls.products.byId(id)
  );
  if (!product) return <div>Loading...</div>;
  const { title, price, rating, description, category } = product;
  return (
    <div className=" container mx-auto p-4 grid grid-cols-2">
      <div className="flex justify-center self-center gap-y-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-lg h-lg object-cover"
        />
      </div>
      <section>
        <p className="text-3xl font-bold mb-6">{title}</p>
        <p className="text-xl font-semibold mb-2">
          <span className="text-xl font-bold">Price: </span>${price.toFixed(2)}
        </p>

        <p className="mb-2">Category: {category}</p>
        <div className="flex items-center mb-4">
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
            <span className="mx-1.5 h-1 w-1 rounded-full " />
            <a
              href="#"
              className="text-sm font-medium  underline hover:no-underline text-white"
            >
              {rating.count} reviews
            </a>
          </Rating>
        </div>
        <p className="text-xl font-semibold">Description</p>
        <p className="mb-4">{description}</p>
        <footer
          aria-label="Add to cart button container"
          className="flex justify-end"
        >
          <Button color="blue">Add to Cart</Button>
        </footer>
      </section>
    </div>
  );
};

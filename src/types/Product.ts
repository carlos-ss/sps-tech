export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface IResponseProductForCart {
  productId: number;
  quantity: number;
}

export interface IProductFilter {
  category: string;
  priceFrom: string;
  priceTo: string;
  rating: number;
  sortOrder: string;
}
export interface IProductListPros {
  filters: IProductFilter;
  itemsPerPage: number;
}

export interface IProductFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onFilterChange: (filters: IProductFilter) => void;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type ProductQuery = {
  search?: string;
  category?: string;
  sort?: "price-asc" | "price-desc";
};

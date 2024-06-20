import productsData from '../../../data.json';

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export const getProductById = (id: number): Product | undefined => {
  return productsData.find((product) => product.id === id);
};

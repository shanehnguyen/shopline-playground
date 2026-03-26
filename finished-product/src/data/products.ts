import { images } from '../assets/images';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  description: string;
  color: string;
  collection: string;
  images: string[];
  specifications: {
    doors: number;
    shelves: number;
    drawers?: number;
  };
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  // DYNAMIC: loop through all products here
];

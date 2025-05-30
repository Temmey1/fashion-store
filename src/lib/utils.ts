import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Tropical Dress",
    price: 99.99,
    image: "/images/products/whitenative.jpeg",
    category: "Dresses",
    isNew: true,
    isFeatured: true,
    isRecommended: false,
  },
  {
    id: "2",
    name: "Classic Leather Jacket",
    price: 199.99,
    image: "/images/products/winenative.jpeg",
    category: "Outerwear",
    isFeatured: true,
    isRecommended: true,
  },
  {
    id: "3",
    name: "Summer Collection Blouse",
    price: 59.99,
    image: "/images/products/caramelnative.jpeg",
    category: "Tops",
    isNew: true,
    isFeatured: false,
    isRecommended: true,
  },
  {
    id: "4",
    name: "Designer Jeans",
    price: 89.99,
    image: "/images/products/creamnative.jpeg",
    category: "Bottoms",
    isFeatured: false,
    isRecommended: true,
  },
  {
    id: "5",
    name: "Floral Maxi Dress",
    price: 129.99,
    image: "/images/products/bluesuit.jpeg",
    category: "Dresses",
    isNew: true,
    isFeatured: true,
    isRecommended: false,
  },
  {
    id: "6",
    name: "Denim Jacket",
    price: 149.99,
    image: "/images/products/creamnative.jpeg",
    category: "Outerwear",
    isFeatured: true,
    isRecommended: true,
  },
  {
    id: "7",
    name: "Casual T-Shirt",
    price: 29.99,
    image: "/images/products/winenative.jpeg",
    category: "Tops",
    isFeatured: false,
    isRecommended: true,
  },
  {
    id: "8",
    name: "Slim Fit Pants",
    price: 79.99,
    image: "/images/products/whitenative.jpeg",
    category: "Bottoms",
    isFeatured: true,
    isRecommended: false,
  },
]; 
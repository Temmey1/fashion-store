"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartStore } from "@/lib/store";
import { ProductModal } from "../product/ProductModal";

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  price: string;
  currencyCode: string;
  image: string;
  variantId: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link
        href={`/product/${product.handle}`}
        className="flex flex-col flex-grow"
      >
        {/* Image Container - Fixed height */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              className="p-2 rounded-full bg-white shadow-sm hover:bg-[var(--color-primary-lighter)] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="w-5 h-5 text-[var(--color-text-lighter)] hover:text-[var(--color-primary)]" />
            </button>
          </div>
        </div>

        {/* Content Container - Flex grow to push button to bottom */}
        <div className="flex flex-col flex-grow p-4 space-y-2">
          {/* Title - Fixed height with ellipsis */}
          <h3 className="text-sm font-medium text-[var(--color-text)] line-clamp-1 h-5">
            {product.title}
          </h3>

          {/* Description - Fixed height with ellipsis */}
          <p className="text-sm text-[var(--color-text-light)] line-clamp-2 h-10">
            {product.description}
          </p>

          {/* Price - Fixed height */}
          <p className="text-sm font-semibold text-[var(--color-text)] h-5">
            ₦{parseFloat(product.price).toLocaleString()}
          </p>
        </div>
      </Link>

      {/* Button Container - Fixed height */}
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-primary-dark)] transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          id: product.id,
          name: product.title,
          price: parseFloat(product.price),
          image: product.image,
          category: product.description,
        }}
      />
    </div>
  );
};

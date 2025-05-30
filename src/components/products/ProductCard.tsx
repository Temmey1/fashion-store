"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartStore } from "@/lib/store";
import { ProductModal } from "../product/ProductModal";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  handle: string;
  variantId: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew,
  handle,
  variantId,
}: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((state: CartStore) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image, variantId });
  };

  return (
    <div className="flex flex-col h-full">
      <Link
        href={`/product/${handle}`}
        className="group relative block flex-grow"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-md bg-[var(--color-primary-lighter)]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          {isNew && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white">
                New
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            <button
              className="p-2 rounded-full bg-white shadow-sm hover:bg-[var(--color-primary-lighter)] transition-colors"
              aria-label="Add to wishlist"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="w-5 h-5 text-[var(--color-text-lighter)] hover:text-[var(--color-primary)]" />
            </button>
            <button
              className="p-2 rounded-full bg-white shadow-sm hover:bg-[var(--color-primary-lighter)] transition-colors"
              aria-label="Add to cart"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(e);
              }}
            >
              <ShoppingBag className="w-5 h-5 text-[var(--color-text-lighter)] hover:text-[var(--color-primary)]" />
            </button>
          </div>
        </div>
        <div className="mt-4 space-y-2 flex-none">
          <h3 className="text-sm font-medium text-[var(--color-text)] line-clamp-1">
            {name}
          </h3>
          <p className="text-sm text-[var(--color-text-light)] line-clamp-2">
            {category}
          </p>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </Link>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, name, price, image, category }}
      />
    </div>
  );
};

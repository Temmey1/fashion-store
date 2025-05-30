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
    <>
      <Link href={`/product/${handle}`} className="group relative block">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[var(--color-primary-lighter)] lg:aspect-none lg:h-80">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-200 group-hover:scale-105"
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
        <div className="mt-4">
          <h3 className="text-sm text-[var(--color-text)]">{name}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-light)]">
            {category}
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--color-text)]">
            ₦{price.toLocaleString()}
          </p>
        </div>
      </Link>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, name, price, image, category }}
      />
    </>
  );
};

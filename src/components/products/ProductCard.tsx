"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartStore } from "@/lib/store";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew,
}: ProductCardProps) => {
  const addItem = useCartStore((state: CartStore) => state.addItem);

  const handleAddToCart = () => {
    addItem({ id, name, price, image });
  };

  return (
    <div className="group h-full flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:opacity-75"
        />
        {isNew && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-600 text-white">
              New
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <button
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-400 hover:text-primary-600" />
          </button>
          <button
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-5 h-5 text-gray-400 hover:text-primary-600" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${id}`} className="hover:text-primary-600">
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-900">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

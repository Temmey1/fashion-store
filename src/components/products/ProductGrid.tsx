"use client";

import { ProductCard } from "../product/ProductCard";
import { useCart } from "@/context/CartContext";

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

interface ProductGridProps {
  products: Product[];
  title: string;
  description?: string;
}

export const ProductGrid = ({
  products,
  title,
  description,
}: ProductGridProps) => {
  const { addToCart } = useCart();

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-xl text-[var(--color-text-light)]">
              {description}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

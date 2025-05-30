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
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-xl text-[var(--color-text-light)]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

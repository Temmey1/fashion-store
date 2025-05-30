"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../products/ProductCard";
import { getProducts } from "@/lib/shopify";

interface ShopifyProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  handle: string;
  description: string;
  currencyCode: string;
  variantId: string;
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const shopifyProducts = await getProducts();
        setProducts(shopifyProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[var(--color-text-light)]">
            Check out our latest collection of trendy fashion items
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={parseFloat(product.price)}
              image={product.image}
              category={product.description.split(".")[0]}
              isNew={true}
              handle={product.handle}
              variantId={product.variantId}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors duration-200 md:text-lg"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

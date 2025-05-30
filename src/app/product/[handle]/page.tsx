"use client";

import { use, useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartStore } from "@/lib/store";
import { getProductByHandle } from "@/lib/shopify";

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const addItem = useCartStore((state: CartStore) => state.addItem);

  const { handle } = use(params);

  useState(() => {
    async function fetchProduct() {
      try {
        const productData = await getProductByHandle(handle);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  });

  const handleAddToCart = () => {
    if (product) {
      const variantId = product.variants[0]?.id;
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.title,
          price: parseFloat(product.price),
          image: product.image,
          variantId,
        });
      }
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-[var(--color-primary-lighter)]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text)]">
                {product.title}
              </h1>
              <p className="mt-2 text-lg text-[var(--color-text-light)]">
                {product.category}
              </p>
            </div>

            <p className="text-3xl font-semibold text-[var(--color-text)]">
              ${parseFloat(product.price).toFixed(2)} {product.currencyCode}
            </p>

            <p className="text-[var(--color-text-light)] text-lg">
              {product.description}
            </p>

            <div className="flex items-center space-x-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 text-[var(--color-text)] text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button className="p-3 rounded-full border border-[var(--color-text-lighter)] text-[var(--color-text-lighter)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Additional Product Info */}
            <div className="pt-8 border-t">
              <h3 className="text-lg font-medium text-[var(--color-text)]">
                Product Details
              </h3>
              <ul className="mt-4 space-y-3 text-[var(--color-text-light)]">
                <li>• High-quality materials</li>
                <li>• Perfect for any occasion</li>
                <li>• Available in multiple sizes</li>
                <li>• Easy care instructions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

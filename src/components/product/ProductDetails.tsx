"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Heart, ShoppingBag } from "lucide-react";
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

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>

          <p className="text-3xl font-semibold text-[var(--color-text)]">
            ₦{parseFloat(product.price).toLocaleString()}
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
  );
};

"use client";
import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { CartStore } from "@/lib/store";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    variantId: string;
  };
}

export const ProductModal = ({
  isOpen,
  onClose,
  product,
}: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state: CartStore) => state.addItem);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-[var(--color-text-lighter)] hover:text-[var(--color-text)] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-[var(--color-primary-lighter)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">
                {product.name}
              </h2>
              <p className="mt-2 text-[var(--color-text-light)]">
                {product.category}
              </p>
            </div>

            <p className="text-2xl font-semibold text-[var(--color-text)]">
              ${product.price}
            </p>

            {product.description && (
              <p className="text-[var(--color-text-light)]">
                {product.description}
              </p>
            )}

            <div className="flex items-center space-x-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 text-[var(--color-text)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => {}}
                className="p-2 rounded-full border border-[var(--color-text-lighter)] text-[var(--color-text-lighter)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 border border-[var(--color-text-lighter)] text-[var(--color-text)] rounded-md hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Product Info */}
            <div className="pt-6 border-t">
              <h3 className="font-medium text-[var(--color-text)]">
                Product Details
              </h3>
              <ul className="mt-4 space-y-2 text-[var(--color-text-light)]">
                <li>• High-quality materials</li>
                <li>• Perfect for any occasion</li>
                <li>• Available in multiple sizes</li>
                <li>• Easy care instructions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

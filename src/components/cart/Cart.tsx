"use client";

import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, removeFromCart, checkout } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleCheckout = async () => {
    const checkoutUrl = await checkout();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="bg-white w-full max-w-md h-screen shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="text-[var(--color-text-lighter)] hover:text-[var(--color-text)]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto text-[var(--color-text-lighter)]" />
                <p className="mt-4 text-[var(--color-text)]">
                  Your cart is empty
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-24 h-24 border rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-text-light)]">
                        ₦{parseFloat(item.price).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-sm text-[var(--color-text-lighter)] hover:text-[var(--color-text)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-medium text-[var(--color-text)]">
                  Subtotal
                </span>
                <span className="text-lg font-semibold text-[var(--color-text)]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] font-medium transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

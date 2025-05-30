"use client";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Shopping Cart ({totalItems()})
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-[var(--color-text-lighter)] hover:text-[var(--color-text)]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-[var(--color-text-light)]">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <div className="relative w-20 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--color-text)]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)]">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(0, item.quantity - 1)
                          )
                        }
                        className="p-1 hover:bg-[var(--color-primary-lighter)] rounded text-[var(--color-text)]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-2 text-[var(--color-text)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-[var(--color-primary-lighter)] rounded text-[var(--color-text)]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 p-1 hover:bg-[var(--color-primary-lighter)] rounded text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-[var(--color-text)]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span className="text-[var(--color-text)]">Total:</span>
              <span className="text-[var(--color-text)]">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-[var(--color-primary)] text-white py-2 rounded-md hover:bg-[var(--color-primary-dark)] transition-colors duration-200">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

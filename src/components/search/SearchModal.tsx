"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SAMPLE_PRODUCTS } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      const filtered = SAMPLE_PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(SAMPLE_PRODUCTS);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
        <div className="flex items-center px-6 py-4 border-b">
          <Search className="w-5 h-5 text-[var(--color-text-lighter)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 ml-3 text-[var(--color-text)] placeholder-[var(--color-text-lighter)] bg-transparent border-none focus:outline-none focus:ring-0"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-[var(--color-text-lighter)] hover:text-[var(--color-text)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[var(--color-primary-lighter)] transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-[var(--color-text)]">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)]">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-center text-[var(--color-text-light)]">
              No products found
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

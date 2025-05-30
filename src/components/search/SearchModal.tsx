"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";

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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
        setFilteredResults(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={onClose}
        />
        <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg">
          <div className="p-4">
            <div className="flex items-center border-b border-gray-200 pb-4">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 flex-1 outline-none"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="mt-4">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.handle}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[var(--color-primary-lighter)] transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-[var(--color-text)]">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-light)]">
                          ₦{parseFloat(product.price).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No results found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

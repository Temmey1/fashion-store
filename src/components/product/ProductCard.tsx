"use client";

import Image from "next/image";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[var(--color-primary-lighter)] lg:aspect-none lg:h-80">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-[var(--color-text)]">
            <Link href={`/product/${product.handle}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-light)]">
            {product.description.substring(0, 100)}...
          </p>
        </div>
        <p className="text-sm font-medium text-[var(--color-text)]">
          {product.currencyCode} {product.price}
        </p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] font-medium transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

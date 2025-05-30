import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/products/ProductGrid";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen py-12">
      <ProductGrid
        products={products}
        title="All Products"
        description="Browse our collection of fashion items"
      />
    </main>
  );
}

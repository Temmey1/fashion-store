import { SAMPLE_PRODUCTS } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function ShopPage() {
  return (
    <ProductGrid
      products={SAMPLE_PRODUCTS}
      title="All Products"
      description="Explore our collection of trendy fashion items"
    />
  );
} 
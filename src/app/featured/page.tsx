import { SAMPLE_PRODUCTS } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function FeaturedPage() {
  const featuredProducts = SAMPLE_PRODUCTS.filter(
    (product) => product.isFeatured
  );

  return (
    <ProductGrid
      products={featuredProducts}
      title="Featured Collection"
      description="Discover our handpicked selection of must-have pieces"
    />
  );
}

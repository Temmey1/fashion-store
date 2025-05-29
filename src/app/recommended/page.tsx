import { SAMPLE_PRODUCTS } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function RecommendedPage() {
  const recommendedProducts = SAMPLE_PRODUCTS.filter(
    (product) => product.isRecommended
  );

  return (
    <ProductGrid
      products={recommendedProducts}
      title="Recommended For You"
      description="Curated selections based on the latest trends"
    />
  );
}

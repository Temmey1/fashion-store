import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/products/ProductGrid";

export default async function RecommendedPage() {
  const products = await getProducts();
  // For now, let's randomly select some products as recommended
  const recommendedProducts = products.slice(0, 4);

  return (
    <ProductGrid
      products={recommendedProducts}
      title="Recommended For You"
      description="Curated selections based on the latest trends"
    />
  );
}

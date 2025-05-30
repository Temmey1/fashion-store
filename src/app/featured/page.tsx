import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/products/ProductGrid";

export default async function FeaturedPage() {
  const products = await getProducts();
  // For now, let's select the last 4 products as featured
  const featuredProducts = products.slice(-4);

  return (
    <ProductGrid
      products={featuredProducts}
      title="Featured Collection"
      description="Discover our handpicked selection of must-have pieces"
    />
  );
}

import { getProductByHandle } from "@/lib/shopify";
import { ProductDetails } from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  if (!params.handle) {
    console.error("Product handle is missing");
    notFound();
  }

  try {
    const product = await getProductByHandle(params.handle);

    if (!product) {
      console.error("Product not found:", params.handle);
      notFound();
    }

    return (
      <main className="min-h-screen py-12">
        <ProductDetails product={product} />
      </main>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    throw error; // Let Next.js error boundary handle it
  }
}

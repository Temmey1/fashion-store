import { getProductByHandle } from "@/lib/shopify";
import { ProductDetails } from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductPage({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.handle) {
    console.error("Product handle is missing");
    notFound();
  }

  try {
    const product = await getProductByHandle(resolvedParams.handle);

    if (!product) {
      console.error("Product not found:", resolvedParams.handle);
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

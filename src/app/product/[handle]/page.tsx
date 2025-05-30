import { getProductByHandle } from "@/lib/shopify";
import { ProductDetails } from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";

type PageParams = {
  handle: string;
};

type SearchParams = { [key: string]: string | string[] | undefined };

type PageProps = {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
};

export default async function ProductPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

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

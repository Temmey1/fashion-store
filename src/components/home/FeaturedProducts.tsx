import { ProductCard } from "../products/ProductCard";

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Tropical Dress",
    price: 99.99,
    image: "/images/products/tropical-dress.jpg",
    category: "Dresses",
    isNew: true,
  },
  {
    id: "2",
    name: "Classic Leather Jacket",
    price: 199.99,
    image: "/images/products/leather-jacket.jpg",
    category: "Outerwear",
  },
  {
    id: "3",
    name: "Summer Collection Blouse",
    price: 59.99,
    image: "/images/products/summer-blouse.jpg",
    category: "Tops",
    isNew: true,
  },
  {
    id: "4",
    name: "Designer Jeans",
    price: 89.99,
    image: "/images/products/designer-jeans.jpg",
    category: "Bottoms",
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-base sm:text-xl text-gray-500">
            Check out our latest collection of trendy fashion items
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-2 sm:px-8 sm:py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center px-4 py-8 sm:px-6 md:py-12">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-[var(--color-text)]">
              <span className="block">WELCOME TO</span>
              <span className="block text-[var(--color-primary)]">
                MAXY STYLES
              </span>
              <span className="block">FASHION</span>
              <span className="block">COLLECTION</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-[var(--color-text-light)] max-w-xl mx-auto md:mx-0">
              Discover unique and trendy fashion pieces that define your style!
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors duration-200 md:text-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-square w-full">
            <div className="w-full h-full relative rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.01]">
              <Image
                src="/images/products/bluesuit.jpeg"
                alt="Fashion model"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

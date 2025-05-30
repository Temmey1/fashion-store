"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/search/SearchModal";
import { CartModal } from "@/components/cart/CartModal";
import { useCart } from "@/context/CartContext";
import { UserMenu } from "@/components/auth/UserMenu";
import Image from "next/image";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/featured", label: "Featured" },
    { href: "/recommended", label: "Recommended" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/images/maxylogo.jpg"
                  alt="Maxy Styles Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                MAXYSTYLES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-md transition-all duration-200 inline-block hover:bg-[var(--color-primary-lighter)]",
                    pathname === link.href
                      ? "text-[var(--color-primary)] font-medium bg-[var(--color-primary-lighter)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                className="inline-flex items-center justify-center p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-all duration-200"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-primary)] rounded-md transition-all duration-200">
                <UserMenu />
              </div>
              <button
                className="inline-flex items-center justify-center p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-all duration-200 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-all duration-200",
                    pathname === link.href && "bg-primary-50 text-primary-600"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

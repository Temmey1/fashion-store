"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/search/SearchModal";
import { Cart } from "@/components/cart/Cart";
import { useCart } from "@/context/CartContext";
import { AuthModal } from "@/components/auth/AuthModal";
import Image from "next/image";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/featured", label: "Featured" },
    { href: "/recommended", label: "Recommended" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/maxylogo.jpg"
                alt="Maxy Styles Logo"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <span className="text-lg font-bold text-[var(--color-primary)] hidden sm:block">
              MAXYSTYLES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary-lighter)]"
                    : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-colors duration-200"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-colors duration-200"
              onClick={() => setIsAuthOpen(true)}
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            <button
              className="p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-colors duration-200 relative"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
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
              className="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium transition-colors duration-200",
                    pathname === link.href
                      ? "text-[var(--color-primary)] bg-[var(--color-primary-lighter)]"
                      : "text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)]"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Login/Account Link in Mobile Menu */}
              <button
                className="w-full text-left px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] transition-colors duration-200"
                onClick={() => {
                  setIsAuthOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Login / Account
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

"use client";
import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useUserStore } from "@/lib/userStore";
import { AuthModal } from "./AuthModal";

export const UserMenu = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 p-3 hover:bg-primary-100 hover:text-primary-600 rounded-lg transition-all duration-200"
            onMouseEnter={() => setIsDropdownOpen(true)}
          >
            <User className="w-5 h-5" />
            <span>{user?.name}</span>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  logout();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center space-x-2 p-3 hover:bg-primary-100 hover:text-primary-600 rounded-lg transition-all duration-200"
        >
          <User className="w-5 h-5" />
          <span>Login</span>
        </button>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

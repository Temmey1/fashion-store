"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useUserStore } from "@/lib/userStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const login = useUserStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // This is a mock login/signup - replace with your actual authentication logic
    if (isLogin) {
      // Mock login
      login({
        id: "1",
        email,
        name: "Demo User",
      });
    } else {
      // Mock signup
      login({
        id: "1",
        email,
        name,
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            {isLogin ? "Login to Your Account" : "Create New Account"}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-lighter)] hover:text-[var(--color-text)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--color-text)] mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-[var(--color-primary-lighter)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                required={!isLogin}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text)] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-[var(--color-primary-lighter)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text)] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-[var(--color-primary-lighter)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              required
              placeholder={
                isLogin ? "Enter your password" : "Create a password"
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-base py-3 px-4 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] font-medium transition-colors duration-200"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="px-6 py-4 bg-[var(--color-primary-lighter)] border-t text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

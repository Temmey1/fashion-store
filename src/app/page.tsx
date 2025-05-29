"use client";
import { useEffect, useState } from "react";

import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
    </main>
  );
}

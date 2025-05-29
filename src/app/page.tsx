"use client";
import { useEffect, useState } from "react";

import { Product } from "@/types";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  );
}

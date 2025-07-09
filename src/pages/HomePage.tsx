import React from 'react';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { AIRecommendations } from '@/components/home/AIRecommendations';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <TrendingProducts />
      <AIRecommendations />
    </div>
  );
};

export default HomePage;
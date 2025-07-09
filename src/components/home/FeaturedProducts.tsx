import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { useShop } from '@/context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts = () => {
  const { products } = useShop();
  const navigate = useNavigate();
  
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked favorites chosen by our AI
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/products')}
            className="hidden md:flex"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button onClick={() => navigate('/products')}>
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
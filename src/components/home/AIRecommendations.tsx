import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/ProductCard';
import { useShop } from '@/context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, ArrowRight } from 'lucide-react';

export const AIRecommendations = () => {
  const { getRecommendedProducts } = useShop();
  const navigate = useNavigate();
  
  const recommendedProducts = getRecommendedProducts();

  return (
    <section className="py-16 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-primary" />
              <Badge className="bg-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended for You</h2>
            <p className="text-muted-foreground text-lg">
              Our AI has analyzed thousands of preferences to find your perfect match
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/products')}
            className="hidden md:flex"
          >
            More Recommendations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-primary/10 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Why these recommendations?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI considers trending items, user reviews, seasonal preferences, and compatibility 
              with popular choices to suggest products you'll love.
            </p>
            <Button onClick={() => navigate('/products')} className="md:hidden">
              Explore AI Recommendations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
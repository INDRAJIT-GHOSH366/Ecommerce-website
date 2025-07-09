import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';

export const ProductGrid = () => {
  const { getFilteredProducts, searchQuery, selectedCategory } = useShop();
  const navigate = useNavigate();
  
  const filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          {searchQuery ? (
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          ) : (
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          {searchQuery ? 'No results found' : 'No products found'}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `Try adjusting your search or browse our categories` 
            : `No products available in ${selectedCategory} category`
          }
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/')}>
            Browse Categories
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
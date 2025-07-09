import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useShop } from '@/context/ShopContext';
import { Grid, List, Filter } from 'lucide-react';

export const SortingHeader = () => {
  const { getFilteredProducts, sortBy, setSortBy, selectedCategory, searchQuery } = useShop();
  
  const filteredProducts = getFilteredProducts();

  const getResultsText = () => {
    const count = filteredProducts.length;
    if (searchQuery) {
      return `${count} results for "${searchQuery}"`;
    }
    if (selectedCategory !== 'All') {
      return `${count} products in ${selectedCategory}`;
    }
    return `${count} products`;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">
          {searchQuery ? `Search Results` : selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h1>
        <p className="text-muted-foreground">{getResultsText()}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Filter Button */}
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="hidden sm:flex border rounded-md">
          <Button variant="ghost" size="sm" className="rounded-r-none">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-l-none">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
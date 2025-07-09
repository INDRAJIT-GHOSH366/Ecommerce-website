import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useShop } from '@/context/ShopContext';
import { Filter } from 'lucide-react';

const categories = ['All', 'Electronics', 'Fashion', 'Home'];

export const Sidebar = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange,
    products
  } = useShop();

  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <h2 className="font-semibold">Filters</h2>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={maxPrice}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Ratings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                {rating} stars & up
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="ai-recommended" />
            <Label htmlFor="ai-recommended" className="text-sm">
              AI Recommended
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="trending" />
            <Label htmlFor="trending" className="text-sm">
              Trending
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale" className="text-sm">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="free-shipping" />
            <Label htmlFor="free-shipping" className="text-sm">
              Free Shipping
            </Label>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );
};
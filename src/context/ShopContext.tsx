import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  trending?: boolean;
  featured?: boolean;
  aiRecommended?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  getFilteredProducts: () => Product[];
  getRecommendedProducts: (productId?: string) => Product[];
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

const mockProducts: Product[] = [
  {
    id: '1',
            name: 'Smart Wireless Headphones',
    description: 'Premium noise-cancelling headphones with AI sound optimization',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    colors: ['Black', 'White', 'Blue'],
    trending: true,
    featured: true,
    aiRecommended: true
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'AI-driven fitness tracking with personalized insights',
    price: 199,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400',
    category: 'Electronics',
    rating: 4.6,
    reviews: 1256,
    inStock: true,
    colors: ['Black', 'Rose Gold', 'Silver'],
    trending: true
  },
  {
    id: '3',
    name: 'Premium Leather Jacket',
    description: 'Handcrafted genuine leather jacket with modern styling',
    price: 459,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'Fashion',
    rating: 4.9,
    reviews: 847,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    featured: true
  },
  {
    id: '4',
    name: 'Smart Home Assistant',
            description: 'Smart home automation hub with voice control',
    price: 179,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400',
    category: 'Electronics',
    rating: 4.7,
    reviews: 3421,
    inStock: true,
    aiRecommended: true
  },
  {
    id: '5',
    name: 'Designer Sneakers',
    description: 'Limited edition sneakers with AI-optimized comfort technology',
    price: 229,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    category: 'Fashion',
    rating: 4.5,
    reviews: 692,
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red'],
    trending: true
  },
  {
    id: '6',
    name: 'Modern Coffee Table',
    description: 'Scandinavian-inspired coffee table with built-in wireless charging',
    price: 899,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    category: 'Home',
    rating: 4.8,
    reviews: 234,
    inStock: true,
    colors: ['Oak', 'Walnut', 'White'],
    featured: true
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color
      };
      setCart(prev => [...prev, cartItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getFilteredProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    return filtered;
  };

  const getRecommendedProducts = (productId?: string) => {
    // Smart recommendation logic (simplified)
    if (productId) {
      const currentProduct = products.find(p => p.id === productId);
      if (currentProduct) {
        return products
          .filter(p => p.id !== productId && p.category === currentProduct.category)
          .slice(0, 4);
      }
    }
    
    return products.filter(p => p.aiRecommended || p.trending).slice(0, 4);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      searchQuery,
      selectedCategory,
      priceRange,
      sortBy,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setSearchQuery,
      setSelectedCategory,
      setPriceRange,
      setSortBy,
      getFilteredProducts,
      getRecommendedProducts,
      cartTotal,
      cartCount,
      addProduct,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Brain
} from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, cartCount, setSelectedCategory } = useShop();
  const { user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedCategory('All');
    navigate('/products');
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Electronics', path: '/products', category: 'Electronics' },
    { name: 'Fashion', path: '/products', category: 'Fashion' },
    { name: 'Home Utilities', path: '/products', category: 'Home' }
  ];

  const handleNavClick = (item: any) => {
    if (item.category) {
      setSelectedCategory(item.category);
      setSearchQuery('');
      setLocalSearch('');
    }
    navigate(item.path);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="w-8 h-8 text-primary" />
            <span className="hidden sm:block">Ecommerce Service</span>
            <span className="sm:hidden">ES</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products with AI..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => navigate('/products')}
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User/Login */}
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Hi, {user.username}</span>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </div>
            )}

            {/* User Icon */}
            <Button variant="ghost" size="icon">
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Login Modal */}
        {/* Removed login modal */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
            
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-left py-2 hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Brain className="w-8 h-8 text-primary" />
              Ecommerce Service
            </Link>
            <p className="text-sm text-muted-foreground">
              Experience the future of shopping with smart recommendations and personalized experiences.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shop</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/products" className="block hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/products" className="block hover:text-foreground transition-colors">
                Electronics
              </Link>
              <Link to="/products" className="block hover:text-foreground transition-colors">
                Fashion
              </Link>
              <Link to="/products" className="block hover:text-foreground transition-colors">
                Home & Garden
              </Link>
              <Link to="/products" className="block hover:text-foreground transition-colors">
                AI Recommendations
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="#" className="block hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link to="#" className="block hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="#" className="block hover:text-foreground transition-colors">
                Shipping Info
              </Link>
              <Link to="#" className="block hover:text-foreground transition-colors">
                Returns
              </Link>
              <Link to="#" className="block hover:text-foreground transition-colors">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get smart product recommendations and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Laveable AI Shop. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useShop, CartItem as CartItemType } from '@/context/ShopContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useShop();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link to={`/product/${item.id}`}>
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link 
              to={`/product/${item.id}`}
              className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
            >
              {item.name}
            </Link>
            
            <div className="text-xs text-muted-foreground mt-1 space-y-1">
              {item.selectedSize && (
                <div>Size: {item.selectedSize}</div>
              )}
              {item.selectedColor && (
                <div>Color: {item.selectedColor}</div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-lg font-bold">
                ${item.price}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-muted-foreground">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
                className="text-destructive hover:text-destructive p-2 h-auto"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
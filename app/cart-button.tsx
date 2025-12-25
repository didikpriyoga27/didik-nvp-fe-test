"use client";

import { useCart } from "@/app/cart/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <Button
      onClick={openCart}
      variant="ghost"
      className="p-2 hover:bg-secondary rounded-full transition-colors relative"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-foreground text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}

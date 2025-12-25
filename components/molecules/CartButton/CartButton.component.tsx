"use client";

import ButtonComponent from "@/components/atoms/Button";
import { CartIcon } from "@/components/atoms/Icons";
import TypographyComponent from "@/components/atoms/Typography";
import { useCartStore } from "@/stores/cart";

/**
 * A component that renders a button linking to the cart page.
 *
 * The button displays a cart icon and, if there are products in the cart,
 * shows a badge indicating the total quantity of items. The badge is styled
 * with a red background and white text.
 *
 * @returns {JSX.Element} A JSX element representing the cart button with an optional item count badge.
 */
const CartButtonComponent = () => {
  const { products } = useCartStore();

  return (
    <ButtonComponent href={"/cart"}>
      <CartIcon className="dark:invert" />
      {products.length > 0 && (
        <div className="absolute">
          <TypographyComponent className="absolute -top-10 -right-10 rounded-full bg-red-500 text-white p-1 px-2 text-center text-xs font-bold">
            {products.reduce((acc, product) => acc + product.qty, 0)}
          </TypographyComponent>
        </div>
      )}
    </ButtonComponent>
  );
};

export default CartButtonComponent;

import WagmiButtonComponent from "@/app/cart/components/WagmiButton";
import CartButtonComponent from "@/components/molecules/CartButton";
import DarkModeToggleComponent from "@/components/molecules/DarkModeToggle";
import LanguageToggleComponent from "@/components/molecules/LanguageToggle";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, Suspense } from "react";
import SearchInputComponent from "../../molecules/SearchInput";
import { IHeaderComponent, IHeaderComponentProps } from "./type";

/**
 * A component that renders the application's header.
 *
 * The header includes optional components such as the logo, search input,
 * cart button, and dark mode toggle button. The visibility of these components
 * can be controlled via the `hiddenComponent` prop.
 *
 * @param {IHeaderComponentProps} props - The props for the header component.
 * @param {IHeaderComponent[]} [props.hiddenComponent=[]] - An array of component
 * names to hide, which can include "logo", "search", "cart", and "dark-mode-toggle".
 *
 * @returns {ReactElement} A JSX element representing the header component.
 */
const HeaderComponent = ({
  hiddenComponent = [],
}: IHeaderComponentProps): ReactElement => {
  const allComponent: IHeaderComponent[] = [
    "logo",
    "search",
    "cart",
    "dark-mode-toggle",
    "language-toggle",
    "wagmi",
  ];
  const renderedComponent = allComponent.filter(
    (component) => !hiddenComponent.includes(component)
  );

  return (
    <header className="flex py-4 w-full justify-center">
      <div className="flex items-center justify-between w-11/12">
        <div className="hidden sm:block">
          {renderedComponent.includes("logo") && (
            <Link href="/products">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
                className="dark:invert cursor-pointer"
              />
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {renderedComponent.includes("search") && (
            <Suspense>
              <SearchInputComponent />
            </Suspense>
          )}
          {renderedComponent.includes("cart") && <CartButtonComponent />}
          {renderedComponent.includes("dark-mode-toggle") && (
            <DarkModeToggleComponent />
          )}
          {renderedComponent.includes("language-toggle") && (
            <LanguageToggleComponent />
          )}
          {renderedComponent.includes("wagmi") && <WagmiButtonComponent />}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;

"use client";

import Link from "next/link";
import { ReactElement } from "react";
import { ButtonVariants } from "./Button.variant";
import { IButtonComponentProps } from "./type";

/**
 * A component that renders a button with a rounded rectangle style.
 *
 * If the `href` prop is provided, the component renders a `Link` component
 * with the given href. Otherwise, it renders a `button` element with the
 * given `onClick` handler.
 *
 * @param {IButtonComponentProps} props - The props object, which contains a
 * `children` property that is the content of the button, an `onClick` property
 * that is the click handler for the button, and an `href` property that is the
 * href of the button.
 *
 * @returns {ReactElement} A JSX element representing the button component.
 */
const ButtonComponent = ({
  children,
  onClick,
  href,
  className,
  type,
  disabled,
  variant = "default",
}: IButtonComponentProps): ReactElement => {
  const combinedClassName = `${className || ""} ${ButtonVariants({
    intent: variant,
  })} `.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;

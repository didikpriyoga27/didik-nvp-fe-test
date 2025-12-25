import { ReactElement } from "react";
import { ITypographyComponentProps } from "./type";

/**
 * A versatile typography component that renders different HTML elements
 * based on the 'as' prop, with optional custom class names.
 *
 * @param {ITypographyComponentProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the typography element.
 * @param {string} [props.as="p"] - The HTML element to render, defaults to a paragraph (<p>).
 * @param {string} [props.className] - Additional class names to apply to the element.
 *
 * @returns {ReactElement} A JSX element representing the typography component.
 */
const TypographyComponent = ({
  children,
  as = "p",
  className,
}: ITypographyComponentProps): ReactElement => {
  const defaultClassName = "text-foreground dark:text-background";
  const combinedClassName = `${defaultClassName} ${className || ""}`.trim();

  switch (as) {
    case "h1":
      return <h1 className={combinedClassName}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClassName}>{children}</h2>;
    case "span":
      return <span className={combinedClassName}>{children}</span>;
    case "label":
      return <label className={combinedClassName}>{children}</label>;
    default:
      return <p className={combinedClassName}>{children}</p>;
  }
};

export default TypographyComponent;

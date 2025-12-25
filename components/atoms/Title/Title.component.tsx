import { PropsWithChildren, ReactElement } from "react";

/**
 * A basic title component.
 *
 * @example
 * <TitleComponent>Title</TitleComponent>
 *
 * @param {ReactNode} children - The content of the title.
 * @returns {ReactElement} A JSX element representing the title component.
 */
const TitleComponent = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <h1 className="text-2xl font-bold text-foreground dark:text-background">
      {children}
    </h1>
  );
};

export default TitleComponent;

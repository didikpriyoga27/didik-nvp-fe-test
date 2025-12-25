/**
 * A modal component that renders a background overlay and a centered child
 * component within a box with a minimum width of 300px on small screens and
 * 500px on medium and larger screens.
 *
 * @example
 * <ModalComponent>
 *  <p>This is a modal.</p>
 * </ModalComponent>
 *
 * @param {ReactNode} children - The child component to be rendered within the modal box.
 *
 * @returns {ReactElement} A JSX element representing the modal component.
 */
import { PropsWithChildren } from "react";

const ModalComponent = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-background dark:bg-foreground backdrop-blur-md p-4 rounded-md shadow-md min-w-75 md:min-w-125">
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;

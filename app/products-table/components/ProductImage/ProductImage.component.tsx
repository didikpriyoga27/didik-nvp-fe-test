/* eslint-disable @next/next/no-img-element */

import useParseImageStringHook from "@/hooks/useParseImageString.hook";
import { useMemo } from "react";
import { IProductImageComponentProps } from "./type";

/**
 * A component that renders a product image.
 *
 * The component takes an `info` property, which is a `CellContext` from `@tanstack/react-table`,
 * and renders an `img` element with the first value of the cell as the source.
 * If the image fails to load, the component displays a default image instead.
 *
 * @example
 * <ProductImageComponent info={cellContext} />
 *
 * @param {IProductImageComponentProps} props - The props object containing the cell context.
 * @param {CellContext} props.info - The cell context containing the image source URL.
 *
 * @returns {JSX.Element} A JSX element representing the product image.
 */
const ProductImageComponent = ({
  info,
}: IProductImageComponentProps): JSX.Element => {
  const { parseImageString } = useParseImageStringHook();

  const src = useMemo(() => {
    return parseImageString(info.getValue()[0]);
  }, [info, parseImageString]);

  return (
    <img
      src={src}
      alt="product image"
      className="w-16 h-16 object-cover rounded-md"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = "/default.png";
      }}
      width="auto"
      height="auto"
    />
  );
};

export default ProductImageComponent;

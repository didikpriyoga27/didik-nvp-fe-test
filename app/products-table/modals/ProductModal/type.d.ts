import { Product } from "../../type";

export interface IProductModalProps {
  selectedProduct?: Product;
  setIsShowProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

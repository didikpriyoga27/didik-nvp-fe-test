import { Product } from "../../type";

export interface IDeleteProductModalProps {
  selectedProduct: Product;
  setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

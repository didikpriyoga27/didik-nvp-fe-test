import { FieldError, UseFormRegister } from "react-hook-form";
import { productSchema } from "../../schemas";

export interface ICategoryListComponentProps {
  register: UseFormRegister<z.input<typeof productSchema>>;
  errors: FieldError<z.errors<typeof productSchema>>;
  defaultValue?: number;
}

import { FieldError, SetFieldValue, UseFormRegister } from "react-hook-form";
import { productSchema } from "../../schemas";

export interface IProductImageUploaderComponentProps {
  register: UseFormRegister<z.input<typeof productSchema>>;
  errors: FieldError<z.errors<typeof productSchema>>;
  setValue: SetFieldValue<z.input<typeof productSchema>>;
  defaultValue?: string | null;
}

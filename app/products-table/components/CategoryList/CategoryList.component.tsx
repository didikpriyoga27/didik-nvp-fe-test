import SelectComponent from "@/components/atoms/Select";
import TypographyComponent from "@/components/atoms/Typography";
import useTranslationHook from "@/i18n/useTranslation.hook";
import useQueryCategoriesHook from "../../hooks/useQueryCategories.hook";
import { ICategoryListComponentProps } from "./type";

/**
 * A component for selecting a category.
 *
 * This component renders a label with a select component and shows an error
 * message if the user has not selected a category.
 *
 * @param {{ register: UseFormRegister<z.input<typeof productSchema>>, errors: z.ZodIssue<z.input<typeof productSchema>>, defaultValue?: number }} props - The props for the component.
 * @returns {JSX.Element} A JSX element representing the component.
 */
const CategoryListComponent = ({
  register,
  errors,
  defaultValue,
}: ICategoryListComponentProps) => {
  const { t } = useTranslationHook();
  const { categoryOptions } = useQueryCategoriesHook();
  return (
    <TypographyComponent as="label">
      {t("products:category")}:
      <SelectComponent
        {...register("categoryId")}
        className="block w-full my-2 p-2 border rounded dark:bg-foreground bg-background"
        options={categoryOptions}
        defaultValue={defaultValue}
      />
      {errors.categoryId && (
        <TypographyComponent
          as="p"
          className="text-red-500 dark:text-red-500 mb-2"
        >
          {errors.categoryId.message as string}
        </TypographyComponent>
      )}
    </TypographyComponent>
  );
};

export default CategoryListComponent;

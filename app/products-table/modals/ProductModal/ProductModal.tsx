import { Product } from "@/components/sections/product-grid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { JSX, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductImageUploaderComponent from "../../components/ProductImageUploader";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import { productSchema } from "../../schemas";
import { CreateProductParams } from "../../type";

interface IProductModalProps {
  selectedProduct?: Product;
  mode: "create" | "edit";
}

/**
 * A modal component for adding or editing a product.
 *
 * The component displays a form with input fields for title, price, and description.
 * When the form is submitted, it triggers a mutation to create or update a product.
 * It also shows a success or error message based on the outcome.
 * It also updates the product list by invalidating the relevant query.
 *
 * @param {IProductModalProps} props - The props for the modal component.
 * @returns {JSX.Element} A JSX element representing the add product modal.
 */
const ProductModal = ({
  selectedProduct,
  mode,
}: IProductModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<
    z.input<typeof productSchema>,
    unknown,
    z.output<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: selectedProduct
      ? {
          title: selectedProduct.title,
          price: String(selectedProduct.price),
          description: selectedProduct.description,
          uploadedImages: selectedProduct.images,
        }
      : undefined,
  });

  const { t } = useTranslationHook();
  const { mutateCreateProduct, mutateUpdateProduct } = useMutationProductHook();
  const { refetch } = useQueryProductsHook();
  const { successMessage, errorMessage } = useToastHook();

  const handleUpdateProduct = useCallback(
    (dataSubmit: CreateProductParams) => {
      mutateUpdateProduct({ data: dataSubmit, id: selectedProduct!.id })
        .then(() => {
          setOpen(false);
          reset();
          refetch();
          successMessage(t("products:successUpdatedProduct"));
        })
        .catch(() => {
          setOpen(false);
          errorMessage(t("products:errorUpdatedProduct"));
        });
    },
    [
      errorMessage,
      mutateUpdateProduct,
      refetch,
      reset,
      selectedProduct,
      successMessage,
      t,
    ]
  );

  const handleCreateProduct = useCallback(
    (dataSubmit: CreateProductParams) => {
      mutateCreateProduct(dataSubmit)
        .then(() => {
          setOpen(false);
          reset();
          refetch();
          successMessage(t("products:successCreatedProduct"));
        })
        .catch(() => {
          setOpen(false);
          errorMessage(t("products:errorCreatedProduct"));
        });
    },
    [errorMessage, mutateCreateProduct, refetch, reset, successMessage, t]
  );

  const onSubmit = useCallback(
    (data: z.output<typeof productSchema>) => {
      const dataSubmit: CreateProductParams = {
        ...data,
        images: watch("uploadedImages"),
      };

      if (mode === "edit" && selectedProduct) {
        return handleUpdateProduct(dataSubmit);
      }
      return handleCreateProduct(dataSubmit);
    },
    [handleCreateProduct, handleUpdateProduct, mode, selectedProduct, watch]
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        ) : (
          <Button
            variant="default"
            size="icon"
            className="h-9 w-9 bg-blue-600 hover:bg-blue-700"
            aria-label="Edit product"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {mode === "edit"
              ? t("products:editProduct")
              : t("products:addProduct")}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-6 px-1"
        >
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              {t("products:title")}
            </Label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              placeholder={t("products:input") + " " + t("products:title")}
              className="w-full"
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              {t("products:price")}
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price")}
              placeholder={t("products:input") + " " + t("products:price")}
              className="w-full"
            />
            {errors.price && (
              <p className="text-sm text-destructive">
                {errors.price.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              {t("products:description")}
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder={
                t("products:input") + " " + t("products:description")
              }
              className="w-full min-h-[100px] resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <ProductImageUploaderComponent
            register={register}
            errors={errors}
            setValue={setValue}
            defaultValue={selectedProduct?.images[0]}
          />
        </form>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-green-600 hover:bg-green-700"
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

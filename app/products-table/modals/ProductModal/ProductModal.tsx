import { Product } from "@/app/products/type";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, X } from "lucide-react";
import { JSX, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";
import useQueryCategoriesHook from "../../hooks/useQueryCategories.hook";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";
import productSchema, { ProductFormData } from "../../schemas/product.schema";

interface IProductModalProps {
  selectedProduct?: Product;
  mode: "create" | "edit";
}

/**
 * A modal component for adding or editing a product.
 *
 * Features:
 * - Title, description, category dropdown
 * - Price and discount percentage
 * - Multiple image URLs
 * - Form validation with Zod
 * - Success/error notifications
 *
 * @param {IProductModalProps} props - The props for the modal component.
 * @returns {JSX.Element} A JSX element representing the add/edit product modal.
 */
const ProductModal = ({
  selectedProduct,
  mode,
}: IProductModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(
    selectedProduct?.images || [""]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<ProductFormData>({
    //@ts-expect-error not error
    resolver: zodResolver(productSchema),
    defaultValues: selectedProduct
      ? {
          title: selectedProduct.title,
          description: selectedProduct.description,
          category: selectedProduct.category,
          price: selectedProduct.price,
          discountPercentage: selectedProduct.discountPercentage || 0,
          images: selectedProduct.images,
        }
      : {
          title: "",
          description: "",
          category: "",
          price: 0,
          discountPercentage: 0,
          images: [""],
        },
  });

  const { t } = useTranslationHook();
  const { mutateCreateProduct, mutateUpdateProduct } = useMutationProductHook();
  const { refetch } = useQueryProductsHook();
  const { categoryOptions: categories, isLoading: categoriesLoading } =
    useQueryCategoriesHook();
  const { successMessage, errorMessage } = useToastHook();

  const handleUpdateProduct = useCallback(
    (dataSubmit: z.infer<typeof productSchema>) => {
      mutateUpdateProduct({ data: dataSubmit, id: selectedProduct!.id })
        .then((res) => {
          console.log(res.data);
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
    (dataSubmit: z.infer<typeof productSchema>) => {
      mutateCreateProduct(dataSubmit)
        .then((res) => {
          console.log(res.data);
          setOpen(false);
          reset();
          setImageUrls([""]);
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
    (data: z.infer<typeof productSchema>) => {
      // Filter out empty image URLs
      const validImages = imageUrls.filter((url) => url.trim() !== "");
      const dataSubmit = {
        ...data,
        images: validImages,
      };

      if (mode === "edit" && selectedProduct) {
        return handleUpdateProduct(dataSubmit);
      }
      return handleCreateProduct(dataSubmit);
    },
    [handleCreateProduct, handleUpdateProduct, mode, selectedProduct, imageUrls]
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
      setImageUrls(selectedProduct?.images || [""]);
    }
  };

  // Image URL handlers
  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls.length === 0 ? [""] : newUrls);
    setValue("images", newUrls.length === 0 ? [""] : newUrls);
  };

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    setValue("images", newUrls);
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
            <Pencil className="h-4 w-4 text-white" />
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
          //@ts-expect-error not error
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-6 px-1"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              {t("products:title")} *
            </Label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              placeholder="Enter product title"
              className="w-full"
            />
            {errors.title && (
              <p className="text-sm text-destructive">
                {errors.title.message as string}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              {t("products:description")} *
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter product description"
              className="w-full min-h-[100px] resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message as string}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              {t("products:category")} *
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={categoriesLoading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message as string}
              </p>
            )}
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                {t("products:price")} * ($)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="0.00"
                className="w-full"
              />
              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="discountPercentage"
                className="text-sm font-medium"
              >
                Discount (%)
              </Label>
              <Input
                id="discountPercentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                {...register("discountPercentage")}
                placeholder="0"
                className="w-full"
              />
              {errors.discountPercentage && (
                <p className="text-sm text-destructive">
                  {errors.discountPercentage.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Multiple Image URLs */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Product Images *</Label>
            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    className="flex-1"
                  />
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeImageUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageUrl}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            </div>
            {errors.images && (
              <p className="text-sm text-destructive">
                {errors.images.message as string}
              </p>
            )}
          </div>
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
            //@ts-expect-error not error
            onClick={handleSubmit(onSubmit)}
            className="bg-green-600 hover:bg-green-700"
          >
            {mode === "edit" ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { JSX, useCallback, useState } from "react";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";

interface IDeleteProductModalProps {
  productId: number;
  productTitle: string;
}

/**
 * A modal component for deleting a product.
 *
 * This component displays a confirmation modal to delete a product.
 * It shows the selected product title and provides "Cancel" and "Delete" buttons.
 * When the "Delete" button is clicked, it triggers a mutation to delete the product
 * and shows a success or error message based on the outcome.
 * It also updates the product list by invalidating the relevant query.
 *
 * @param {IDeleteProductModalProps} props - The props for the modal component.
 * @returns {JSX.Element} A JSX element representing the delete product modal.
 */
const DeleteProductModal = ({
  productId,
  productTitle,
}: IDeleteProductModalProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslationHook();
  const { mutateDeleteProduct } = useMutationProductHook();
  const { successMessage, errorMessage } = useToastHook();
  const queryClient = useQueryClient();

  const handleDeleteOnClick = useCallback(() => {
    mutateDeleteProduct(productId)
      .then((res) => {
        console.log(res.data);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setOpen(false);
        successMessage(t("products:successDeletedProduct"));
      })
      .catch(() => {
        setOpen(false);
        errorMessage(t("products:errorDeletedProduct"));
      });
  }, [
    errorMessage,
    mutateDeleteProduct,
    queryClient,
    productId,
    successMessage,
    t,
  ]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="h-9 w-9"
          aria-label="Delete product"
        >
          <Trash2 className="h-4 w-4 text-white" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {productTitle}
            </span>
            {""}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteOnClick}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductModal;

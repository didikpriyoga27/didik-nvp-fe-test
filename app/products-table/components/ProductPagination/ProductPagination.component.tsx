import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useQueryProductsHook from "../../hooks/useQueryProducts.hook";

/**
 * A component that renders pagination controls for the products page.
 *
 * This component utilizes the `useQueryProductsHook` to get pagination data
 * and renders pagination buttons accordingly.
 * It includes the following elements:
 * - A "Previous" button to navigate to the previous page.
 * - Page number buttons with smart ellipsis for skipped pages.
 * - A "Next" button to navigate to the next page.
 *
 * The buttons update the URL query string to reflect the selected page number.
 */
function ProductPaginationComponent() {
  const { productsData, page, setPage } = useQueryProductsHook();

  const total = productsData?.total || 0;
  const limit = productsData?.limit || 10;
  const maxPage = Math.ceil(total / limit);

  const currentPage = page || 1;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (maxPage <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= maxPage; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(maxPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < maxPage - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(maxPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (maxPage <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && setPage(currentPage - 1)}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pageNumbers.map((pageNum, index) =>
          pageNum === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                onClick={() => setPage(pageNum)}
                isActive={currentPage === pageNum}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < maxPage && setPage(currentPage + 1)}
            className={
              currentPage >= maxPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ProductPaginationComponent;

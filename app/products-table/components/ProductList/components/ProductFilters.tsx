import useQueryCategoriesHook from "@/app/products-table/hooks/useQueryCategories.hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryStringHook from "@/hooks/useQueryString.hook";
import { ArrowUpDown, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { JSX, useState } from "react";

/**
 * A component that renders search, sort, and filter controls for products.
 *
 * Features:
 * - Search products by query
 * - Sort products by various fields
 * - Filter products by category
 * - Clear all filters
 */
const ProductFilters = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryString, createQueryString } = useQueryStringHook();
  const { categoryOptions: categories } = useQueryCategoriesHook();

  const [searchInput, setSearchInput] = useState(
    getQueryString("search") || ""
  );

  const currentCategory = getQueryString("category") || "";
  const currentSort = getQueryString("sortBy") || "";
  const currentOrder = getQueryString("order") || "asc";

  const handleSearch = () => {
    if (searchInput.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchInput.trim());
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams();
      params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search);

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (sortBy: string) => {
    const params = new URLSearchParams(window.location.search);

    if (sortBy === "none") {
      params.delete("sortBy");
      params.delete("order");
    } else {
      params.set("sortBy", sortBy);
      if (!params.has("order")) {
        params.set("order", "asc");
      }
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleSortOrder = () => {
    if (!currentSort) return;

    const params = new URLSearchParams(window.location.search);
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    params.set("order", newOrder);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push(pathname);
  };

  const hasActiveFilters = searchInput || currentCategory || currentSort;

  return (
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Search by title or description..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={currentCategory || "all"}
            onValueChange={handleCategoryChange}
            // disabled={categoriesLoading}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <div className="flex gap-2">
            <Select
              value={currentSort || "none"}
              onValueChange={handleSortChange}
            >
              <SelectTrigger id="sort" className="flex-1">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
            {currentSort && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                className="shrink-0"
                title={`Order: ${
                  currentOrder === "asc" ? "Ascending" : "Descending"
                }`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters & Clear Button */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">Active Filters:</span>
            {searchInput && (
              <span className="text-sm bg-background px-2 py-1 rounded">
                Search: {searchInput}
              </span>
            )}
            {currentCategory && (
              <span className="text-sm bg-background px-2 py-1 rounded">
                Category: {currentCategory}
              </span>
            )}
            {currentSort && (
              <span className="text-sm bg-background px-2 py-1 rounded">
                Sort: {currentSort} ({currentOrder})
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;

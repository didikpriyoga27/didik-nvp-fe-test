import { z } from "zod";

/**
 * Product schema for validation
 * Matches DummyJSON API requirements for add/update operations
 */
const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  discountPercentage: z.coerce
    .number()
    .min(0, { message: "Discount must be 0 or greater" })
    .max(100, { message: "Discount cannot exceed 100%" })
    .default(0),
  images: z
    .array(z.string().url({ message: "Each image must be a valid URL" }))
    .min(1, { message: "At least one image is required" }),
});

export type ProductFormData = z.infer<typeof productSchema>;

export default productSchema;

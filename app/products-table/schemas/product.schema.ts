import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.preprocess(
    (priceText) => parseInt(z.string().parse(priceText), 10),
    z.number().min(1, { message: "Price is required" })
  ),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.preprocess(
    (categoryText) => parseInt(z.string().parse(categoryText), 10),
    z.number().min(1, { message: "Category is required" })
  ),
  uploadedImages: z
    .array(z.string(), { message: "At least one image is required" })
    .min(1, { message: "At least one image is required" }),
});

export default productSchema;

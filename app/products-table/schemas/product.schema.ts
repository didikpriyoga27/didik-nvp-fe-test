import { TFileAndProperties } from "@/i18n/type";
import { z } from "zod";

/**
 * Product schema for validation
 * Matches DummyJSON API requirements for add/update operations
 */
const createProductSchema = (t: (key: TFileAndProperties) => string) => {
  return z.object({
    title: z.string().min(1, { message: t("products:titleIsRequired") }),
    description: z
      .string()
      .min(1, { message: t("products:descriptionIsRequired") }),
    category: z.string().min(1, { message: t("products:categoryIsRequired") }),
    price: z.coerce
      .number()
      .min(0.01, { message: t("products:priceMustBeGreaterThanZero") }),
    discountPercentage: z.coerce
      .number()
      .min(0, {
        message: t("products:discountPercentageMustBeBetweenZeroAndHundred"),
      })
      .max(100, {
        message: t("products:discountPercentageMustBeBetweenZeroAndHundred"),
      })
      .default(0),
    images: z
      .array(z.string().url({ message: t("products:imagesMustBeValidURLs") }))
      .min(1, { message: t("products:imagesIsRequired") }),
  });
};

export type ProductFormData = z.infer<ReturnType<typeof createProductSchema>>;

export default createProductSchema;

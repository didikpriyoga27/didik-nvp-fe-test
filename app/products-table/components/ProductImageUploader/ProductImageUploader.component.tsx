/* eslint-disable @next/next/no-img-element */
import InputComponent from "@/components/atoms/Input";
import TypographyComponent from "@/components/atoms/Typography";
import useParseImageStringHook from "@/hooks/useParseImageString.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import axios from "axios";
import { useCallback, useState } from "react";
import { IProductImageUploaderComponentProps } from "./type";

/**
 * A component for uploading and previewing product images.
 *
 * This component uses a file input to allow users to upload an image.
 * Upon uploading, it sends the image to a server endpoint to be stored,
 * and then displays a preview of the uploaded image. If an error occurs
 * during the upload, it displays an error message.
 *
 * @param {IProductImageUploaderComponentProps} props - The props for the component.
 * @param {UseFormRegister} props.register - The register function from react-hook-form for managing input state.
 * @param {FieldError} props.errors - The object containing validation errors for the form fields.
 * @param {SetFieldValue} props.setValue - The function to programmatically set the value of a form field.
 * @param {string|null} [props.defaultValue=null] - The default image URL for the component, if any.
 *
 * @returns {JSX.Element} A JSX element representing the image uploader and preview component.
 */
const ProductImageUploaderComponent = ({
  register,
  errors,
  setValue,
  defaultValue = null,
}: IProductImageUploaderComponentProps) => {
  const { t } = useTranslationHook();
  const { parseImageString } = useParseImageStringHook();
  const parsedDefaultValue = parseImageString(defaultValue || "");

  const [previewImage, setPreviewImage] = useState<string | null>(
    parsedDefaultValue || ""
  );

  const uploadImage = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files?.[0];
      if (!image) return;

      const formData = new FormData();
      formData.append("file", image, image.name);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.location) {
        setPreviewImage(response.data.location);
        setValue("uploadedImages", [response.data.location]);
        if (errors.images) {
          delete errors.images;
        }
      }
    },
    [errors.images, setValue]
  );

  return (
    <>
      <TypographyComponent as="label">
        {t("products:image")}:
        <InputComponent
          type="file"
          {...register("images")}
          className="block w-full bg-transparent my-2 p-2 border rounded"
          placeholder={t("products:input") + " " + t("products:image")}
          accept="image/*"
          onChange={(e) => {
            register("images").onChange(e);
            uploadImage(e);
          }}
        />
        {errors.uploadedImages && (
          <TypographyComponent
            as="p"
            className="text-red-500 dark:text-red-500 mb-2"
          >
            {errors.uploadedImages.message as string}
          </TypographyComponent>
        )}
      </TypographyComponent>
      {previewImage && (
        <img
          src={previewImage}
          alt="preview image"
          className="w-24 h-24 object-cover rounded-md mt-2"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/default.png";
          }}
        />
      )}
    </>
  );
};

export default ProductImageUploaderComponent;

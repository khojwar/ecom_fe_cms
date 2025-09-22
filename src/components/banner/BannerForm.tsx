import { Button, Input, Select, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export interface IBannerFormData {
  title: string;
  status: "active" | "inactive";
  link: string;
  image: File | null;
}

interface BannerFormProps {
  initialValues?: Partial<IBannerFormData>;   // for edit pre-filled data
  onSubmit: (data: IBannerFormData) => Promise<void>; // submit handler
  submitLabel?: string;                       // custom button text
  requireImage?: boolean;                     // for validation differences
}

// ✅ Yup schema
const makeSchema = (requireImage: boolean) => {
  const baseSchema = {
    title: yup.string().required("Title is required"),
    status: yup.string().oneOf(["active", "inactive"]).required("Status is required"),
    link: yup.string().url("Must be a valid URL").required("URL link is required"),
    image: yup.mixed(),
  };

  return yup.object().shape({
    ...baseSchema,
    image: requireImage
      ? baseSchema.image.required("Image is required")
      : baseSchema.image.nullable(),
  }) as yup.ObjectSchema<IBannerFormData>;
};

const BannerForm = ({ initialValues, onSubmit, submitLabel = "Save Banner", requireImage = true, }: Readonly<BannerFormProps>) => {
  
  const [thumbUrl, setThumbUrl] = useState<string>("https://placehold.co/300x100");

  const {handleSubmit,control,formState: { errors, isSubmitting }, reset,} = useForm<IBannerFormData>({
    defaultValues: {
      title: "",
      status: "active",
      link: "",
      image: null,
      ...initialValues, // merge defaults with initial values
    },
    resolver: yupResolver(makeSchema(requireImage)),
  });

  // ✅ Reset form when initialValues changes (for edit)
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      if (initialValues.image && typeof initialValues.image === "string") {
        setThumbUrl(initialValues.image);
      }
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-medium mb-1 w-1/4">Title</label>
        <div className="w-3/4 flex flex-col">
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Enter banner title" />}
          />
          {errors.title && <p className="text-red-500 text-sm italic">{errors.title.message}</p>}
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-medium mb-1 w-1/4">Status</label>
        <div className="w-3/4 flex flex-col">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select status">
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            )}
          />
          {errors.status && <p className="text-red-500 text-sm italic">{errors.status.message}</p>}
        </div>
      </div>

      {/* URL Link */}
      <div className="mb-4 flex items-center">
        <label className="block text-sm font-medium mb-1 w-1/4">URL Link</label>
        <div className="w-3/4 flex flex-col">
          <Controller
            name="link"
            control={control}
            render={({ field }) => <Input {...field} placeholder="https://example.com" />}
          />
          {errors.link && <p className="text-red-500 text-sm italic">{errors.link.message}</p>}
        </div>
      </div>

      {/* Image */}
      <div className="mb-4 flex items-start gap-4">
        <label className="block text-sm font-medium mb-1 w-1/4">Image</label>
        <div className="w-3/4 flex flex-col">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Upload
                beforeUpload={(file) => {
                  field.onChange(file);
                  setThumbUrl(URL.createObjectURL(file));
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            )}
          />
          <img src={thumbUrl} alt="Preview" className="mt-2 h-24 rounded border" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between space-x-2">
        <Button
          type="default"
          htmlType="reset"
          disabled={isSubmitting}
          className="flex-1! bg-red-900! text-white! disabled:opacity-50! hover:bg-red-950!"
        >
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          className="flex-1! bg-teal-900! text-white! disabled:opacity-50! hover:bg-teal-950!"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default BannerForm;

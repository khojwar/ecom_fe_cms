import { UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import {
  Controller,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { brandSvc } from "../../services/brand.service";
import { useNavigate, useParams } from "react-router";

export type brandStatus = "active" | "inactive";

export type FieldType = {
  name: string;
  status: brandStatus;
  logo: File | null; // ✅ file for upload
};

const BrandFormDTO = yup.object({
  name: yup.string().required("Brand name is required"),
  status: yup
    .mixed<brandStatus>()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
  logo: yup.mixed<File>().nullable().default(null), // ✅ file | null
});

const BrandEditPage = () => {
  const {
    handleSubmit, control, formState: { errors, isSubmitting }, reset, } = useForm<FieldType>({
    resolver: yupResolver(BrandFormDTO),
    defaultValues: {
      name: "",
      status: "active",
      logo: null,
    },
  });

  const [thumbUrl, setThumbUrl] = useState<string>(
    "https://placehold.co/300x100"
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // ✅ fetch brand details
  const fetchBrandData = async () => {
    try {
      const response = await brandSvc.getRequest(`/brand/${id}`);
      if (response?.data) {
        const brand = response.data;
        
        // ✅ reset form with fetched data
        reset({
          name: brand.name,
          status: brand.status,
          logo: null, // keep null, user must re-upload if updating
        });

        // ✅ show existing logo
        if (brand.logo) {
          setThumbUrl(brand.logo.optimizedUrl);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch brand data.", {
        description: "Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (id) fetchBrandData();
  }, [id]);

  // ✅ submit form
  const brandFormSubmit: SubmitHandler<FieldType> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", data.status);
      if (data.logo) {
        formData.append("logo", data.logo);
      }

      await brandSvc.putRequest(`/brand/${id}`, formData, {
        headers: { "content-Type": "multipart/form-data" },
      });

      toast.success("Brand updated successfully!", {
        description: "The brand details have been updated.",
      });

      navigate("/admin/brands");
    } catch (exception) {
      toast.error("An error occurred while updating the brand.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
          Edit Brand
        </h1>
      </div>

      <form onSubmit={handleSubmit(brandFormSubmit)} className="space-y-4">
        {/* Name */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">
            Name
          </label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter brand name" />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm italic">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">
            Status
          </label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select status"
                >
                  <Select.Option value="inactive">Inactive</Select.Option>
                  <Select.Option value="active">Active</Select.Option>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500 text-sm italic">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="mb-4 flex items-start">
          <label className="block text-sm font-medium mb-1 w-1/4">
            Logo
          </label>
          <div className="w-3/4 flex flex-col">
            <div className="flex gap-4 justify-between">
              <Controller
                name="logo"
                control={control}
                render={({ field }) => (
                  <Upload
                    beforeUpload={(file) => {
                      field.onChange(file);
                      setThumbUrl(URL.createObjectURL(file));
                      return false; // stop auto-upload
                    }}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>
                      Select Image
                    </Button>
                  </Upload>
                )}
              />
              <img
                src={thumbUrl}
                alt="Preview"
                className="mt-2 h-24 rounded shadow"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-2">
          <Button
            type="default"
            htmlType="button"
            onClick={() => navigate("/admin/brands")}
            disabled={isSubmitting}
            className="flex-1! bg-red-900! text-white! disabled:opacity-50! hover:bg-red-950!"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className="flex-1! bg-teal-900! text-white! hover:bg-teal-950!"
          >
            Update Brand
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandEditPage;

import { UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select, Upload } from "antd";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { brandSvc } from "../../services/brand.service";
import { useNavigate } from "react-router";

export type brandStatus = "active" | "inactive";

export type FieldType = {
  name: string;
  status: brandStatus;
  logo: File | null; // ✅ not optional
};

const BrandFormDTO = yup.object({
  name: yup.string().required("Brand name is required"),
  status: yup.mixed<brandStatus>().oneOf(["active", "inactive"]).required("Status is required"),
  logo: yup.mixed<File>().nullable().default(null), // ✅ matches File | null
});


// const brandFormSubmit = async (data: FieldType) => {
//   console.log("Form Data Submitted: ", data);
//   // Implement actual submission logic here

// }



const BrandCreatePage = () => {

  const { handleSubmit, control, formState: { errors, isSubmitting }, } = useForm<FieldType>({
    resolver: yupResolver(BrandFormDTO),
    defaultValues: {
      name: "",
      status: "active",
      logo: null,
    },
  });

  const [thumbUrl, setThumbUrl] = useState<string>("https://placehold.co/300x100");
  const navigate = useNavigate();

  const brandFormSubmit: SubmitHandler<FieldType> = async (data) => {
      // console.log("Form Data Submitted: ", data);
      try {
        await brandSvc.postRequest('/brand', data, {
          headers: { 'content-Type': 'multipart/form-data' }
        });

        toast.success("Brand created successfully!", {
          description: "The new brand has been added.",
        });

        // Reset form or redirect user
        navigate('/admin/brands');
        
      } catch (exception) {
        toast.error("An error occurred while creating the brand.", {
          description: "Please try again later.",
        });
      }

    };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
          Create Brand
        </h1>
      </div>

      <form onSubmit={handleSubmit(brandFormSubmit)} className="space-y-4">
        {/* Title */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Title</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter banner title" />}
            />
            {errors.name && <p className="text-red-500 text-sm italic">{errors.name.message}</p>}
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

            {errors.status && <p className="text-red-500 text-sm italic">{errors.status.message}</p>}
          </div>
        </div>

        {/* Image */}
        <div className="mb-4 flex items-start">
          <label className="block text-sm font-medium mb-1 w-1/4">Logo</label>
          <div className="w-3/4 flex flex-col">
              <div className="flex justify-between">
                  <Controller
                    name="logo"
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
                  <img src={thumbUrl} alt="Preview" className="mt-2 h-24 rounded shadow" />
                </div>
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
            Create Brand
          </Button>
        </div>
      </form>


    </div>
  );
};

export default BrandCreatePage;

import { Button, Input, Select, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UploadOutlined } from "@ant-design/icons";
import { bannerSvc } from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface IBannerCreateForm {
  title: string;
  status: "active" | "inactive";
  link: string;
  image: File | null | any;
}

// ✅ Yup schema for validation
const IBannerDTO = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup.string().oneOf(["active", "inactive"]).required("Status is required"),
  link: yup.string().url("Must be a valid URL").required("URL link is required"),
  image: yup.mixed().required("Image is required")
});

const BannerCreatePage = () => {
  const { handleSubmit, control, formState: { errors, isSubmitting }, setError } = useForm<IBannerCreateForm>({
    defaultValues: {
      title: "",
      status: "active",
      link: "",
      image: null
    },
    resolver: yupResolver(IBannerDTO),
  });

  const navigate = useNavigate();

  const BannerSubmit = async (data: IBannerCreateForm) => {
    try {

      await bannerSvc.postRequest("/banner", data, {
        headers: {
          "content-Type": "multipart/form-data",
        }
      });

      toast.success("Banner created successfully!", {
        description: "The new banner has been added."
      });


      navigate("/admin/banners");
      // console.log("Banner Form Submitted:", data);

    } catch (error) {
      console.error("Banner form error:", error);
    }
  };

  return (
    <div>
        <div className='mb-4 text-teal-900 border-b-2 border-teal-900 pb-2'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                <h2 className='text-2xl font-bold  '>Create Banner</h2>
            </div>
        </div>

        <div className="max-w-3xl mx-auto p-6 border border-gray-200 rounded shadow">
          <form onSubmit={handleSubmit(BannerSubmit)} className="space-y-4">

              {/* Title */}
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium mb-1 w-1/4">Title</label>
                <div className="w-3/4 flex flex-col">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Enter banner title" />
                    )}
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
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
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
                    render={({ field }) => (
                      <Input {...field} placeholder="https://example.com" />
                    )}
                  />
                  {errors.link && <p className="text-red-500 text-sm italic">{errors.link.message}</p>}
                </div>
              </div>

              {/* Image */}
              <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium mb-1 w-1/4">Image</label>
                <div className="w-3/4 flex flex-col">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Upload
                        beforeUpload={(file) => {
                          field.onChange(file); // Save file in react-hook-form
                          return false; // Prevent auto upload
                        }}
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                      </Upload>
                    )}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-2">
                <Button type="default" htmlType="reset" disabled={isSubmitting} className="flex-1! bg-red-900! text-white! disabled:opacity-50! disabled:cursor-not-allowed! hover:bg-red-950!">
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" disabled={isSubmitting} className="flex-1! bg-teal-900! text-white! disabled:opacity-50! disabled:cursor-not-allowed! hover:bg-teal-950!">
                  Save Banner
                </Button>
              </div>
            </form>
        </div>
    </div>
  );
};

export default BannerCreatePage;

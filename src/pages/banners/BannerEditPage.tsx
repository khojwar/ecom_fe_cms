import { Button, Input, Select, Spin, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { bannerSvc } from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

interface IBannerCreateForm {
  title: string;
  status: "active" | "inactive";
  link: string;
  image?: File | null;
}



const BannerEditPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [thumbUrl, setThumbUrl] = useState<string>("https://placehold.co/300x100");

  const params = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    setValue, 
  } = useForm<IBannerCreateForm>({
    defaultValues: {
      title: "",
      status: "active",
      link: "",
      image: null,
    },
  });

  const BannerSubmit = async (data: IBannerCreateForm) => {
    try {
      await bannerSvc.putRequest("/banner/" + params.id, data, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      toast.success("Congratulations", {
        description: "Banner updated successfully!",
      });

      navigate("/admin/banners");
    } catch (exception: any) {
      if (exception.error) {
        Object.keys(exception.error).map((key) => {
          setError(key as keyof IBannerCreateForm, { type: "manual", message: exception.error[key] });
        });
      }

      toast.error("Error!!!", {
        description: "Error while updating banner.",
      });
    }
  };

  const getBannerDetails = async () => {
    setLoading(true);
    try {
      const response = await bannerSvc.getRequest(`/banner/${params.id}`);
      setValue("title", response.data.title);
      setValue("status", response.data.status);
      setValue("link", response.data.link);
      setThumbUrl(response.data.image?.optimizedUrl || "https://placehold.co/300x100");
    } catch {
      toast.error("Error!!!", {
        description: "Error while fetching banner details.",
      });
      navigate("/admin/banners");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call getBannerDetails on mount
  useEffect(() => {
    getBannerDetails();
  }, []);

  return (
    <div>
      <div className="mb-4 text-teal-900 border-b-2 border-teal-900 pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold">Edit Banner</h2>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6 border border-gray-200 rounded shadow">
        {loading ? (
          <div>
            <Spin size="large" className="mx-auto! my-20!" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(BannerSubmit)} className="space-y-4">
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
                {/* ✅ Show preview */}
                <img src={thumbUrl} alt="Preview" className="mt-2 h-24 rounded border" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between space-x-2">
              <Button
                type="default"
                htmlType="reset"
                disabled={isSubmitting}
                className="flex-1! bg-red-900! text-white! disabled:opacity-50! disabled:cursor-not-allowed! hover:bg-red-950!"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                className="flex-1! bg-teal-900! text-white! disabled:opacity-50! disabled:cursor-not-allowed! hover:bg-teal-950!"
              >
                Save Banner
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BannerEditPage;

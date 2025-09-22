
import { bannerSvc } from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import type { IBannerFormData } from "../../components/banner/BannerForm";
import BannerForm from "../../components/banner/BannerForm";

const BannerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<IBannerFormData>>();
  const [loading, setLoading] = useState(true);

  const getBannerDetails = async () => {
    setLoading(true);
    try {
      const res = await bannerSvc.getRequest(`/banner/${id}`);
      setInitialValues({
        title: res.data.title,
        status: res.data.status,
        link: res.data.link,
        image: res.data.image?.optimizedUrl, // string URL for preview
      });
    } catch {
      toast.error("Error fetching banner");
      navigate("/admin/banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBannerDetails();
  }, [id]);

  const handleUpdate = async (data: IBannerFormData) => {
    try {
      await bannerSvc.putRequest(`/banner/${id}`, data, {
        headers: { "content-Type": "multipart/form-data" },
      });
      toast.success("Banner updated successfully!");
      navigate("/admin/banners");
    } catch (error) {
      toast.error("Error updating banner");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>
      {loading ? <Spin size="large" className="mx-auto my-20" /> : (
        <BannerForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          requireImage={false} // ✅ editing: image not mandatory
          submitLabel="Update Banner"
        />
      )}
    </div>
  );
};

export default BannerEditPage;

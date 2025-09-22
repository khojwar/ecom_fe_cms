
import { bannerSvc } from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { IBannerFormData } from "../../components/banner/BannerForm";
import BannerForm from "../../components/banner/BannerForm";

const BannerCreatePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data: IBannerFormData) => {
    try {
      await bannerSvc.postRequest("/banner", data, {
        headers: { "content-Type": "multipart/form-data" },
      });
      toast.success("Banner created successfully!");
      navigate("/admin/banners");
    } catch (error) {
      toast.error("Error creating banner");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Banner</h2>
      <BannerForm onSubmit={handleCreate} requireImage={true} submitLabel="Create Banner" />
    </div>
  );
};

export default BannerCreatePage;

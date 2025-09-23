
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
    <>
        <div className='mb-4 text-teal-900 border-b-2 border-teal-900 pb-2'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                <h2 className='text-2xl font-bold  '>Create Banner</h2>
            </div>
        </div>
        <BannerForm onSubmit={handleCreate} requireImage={true} submitLabel="Create Banner" />
    </>
  );
};

export default BannerCreatePage;

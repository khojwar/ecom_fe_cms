
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { categorySvc } from "../../services/category.serviece";
import type { IBrand, ICategory } from "./CategoryListingPage";


export type categoryStatus = "active" | "inactive";

export type FieldType = {
  name: string;
  status: categoryStatus;
  icon: File | null; // ✅ not optional
  parentId: string | null | undefined; // ✅ optional
  showInMenu: boolean | undefined; // ✅ optional
  homeFeature: boolean | undefined; // ✅ optional
  brands: string[] | undefined; // ✅ optional
};

const CategoryCreatePage = () => {

  const { handleSubmit, control, formState: { errors, isSubmitting }, } = useForm<FieldType>({
    defaultValues: {
      name: "",
      status: "active",
      icon: null,
      parentId: null,
      showInMenu: false,
      homeFeature: false,
      brands: [],
    },
  });

  const [thumbUrl, setThumbUrl] = useState<string>("https://placehold.co/300x100");
  const [brands, setBrands] = useState<IBrand[]>([]); // Fetch and set available brands
  const [categories, setCategories] = useState<ICategory[]>([]); // Fetch and set available categories

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch brands and categories for the select options
    const fetchBrands = async () => {
      try {
        const response = await categorySvc.getRequest('/brand');
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        toast.error("Failed to load brands.", {
          description: "Please refresh the page or try again later.",
        });
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await categorySvc.getRequest('/category');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.", {
          description: "Please refresh the page or try again later.",
        });
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

  const categoryFormSubmit: SubmitHandler<FieldType> = async (data) => {
      // console.log("Form Data Submitted: ", data);
      try {
        await categorySvc.postRequest('/category', data, {
          headers: { 'content-Type': 'multipart/form-data' }
        });

        toast.success("Category created successfully!", {
          description: "The new category has been added.",
        });

        // Reset form or redirect user
        navigate('/admin/categories');

      } catch (exception) {
        toast.error("An error occurred while creating the category.", {
          description: "Please try again later.",
        });
      }

    };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
          Create Category
        </h1>
      </div>

      <form onSubmit={handleSubmit(categoryFormSubmit)} className="space-y-4">
        {/* Title */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Title</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Enter category name" />}
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
          <label className="block text-sm font-medium mb-1 w-1/4">Icon</label>
          <div className="w-3/4 flex flex-col">
              <div className="flex justify-between">
                  <Controller
                    name="icon"
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

        {/* parentId */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Parent Category</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="parentId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select parent category"
                >
                  {/* Map through available categories to create options */}
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}

                </Select>
              )}
            />
            {errors.parentId && <p className="text-red-500 text-sm italic">{errors.parentId.message}</p>}
          </div>
        </div>

        {/* showInMenu */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Show in Menu</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="showInMenu"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.showInMenu && <p className="text-red-500 text-sm italic">{errors.showInMenu.message}</p>}
          </div>
        </div>

        {/* homeFeature */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Home Feature</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="homeFeature"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.homeFeature && <p className="text-red-500 text-sm italic">{errors.homeFeature.message}</p>}
          </div>
        </div>

        {/* brands */}
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium mb-1 w-1/4">Brands</label>
          <div className="w-3/4 flex flex-col">
            <Controller
              name="brands"
              control={control}
              render={({ field }) => (
                <Select
                  mode="multiple"
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select brands"
                >
                  {/* Map through available brands to create options */}
                  {brands.map((brand) => (
                    <Select.Option key={brand._id} value={brand._id}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
            {errors.brands && <p className="text-red-500 text-sm italic">{errors.brands.message}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-2">
          <Button
            type="default"
            htmlType="button"
            disabled={isSubmitting}
            className="flex-1! bg-red-900! text-white! disabled:opacity-50! hover:bg-red-950!"
            onClick={() => navigate('/admin/categories')}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting}
            className="flex-1! bg-teal-900! text-white! disabled:opacity-50! hover:bg-teal-950!"
          >
            Create Category
          </Button>
        </div>
      </form>


    </div>
  );
};

export default CategoryCreatePage;

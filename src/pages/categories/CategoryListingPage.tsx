
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Table,  type TableProps } from "antd"
import { useEffect, useState } from "react";
import { paginationDefault } from "../../config/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { categorySvc } from "../../services/category.serviece";


// ✅ Enums for fixed values
export type CategoryStatus = "active" | "inactive";
export type BrandStatus = "active" | "inactive";
export type UserRole = "admin" | "seller" | "user";
export type UserStatus = "ACTIVE" | "INACTIVE";

// ✅ Brand type
export interface IBrand {
  _id: string
  name: string
  slug: string
  logo: string
  status: BrandStatus
}

// ✅ User type
export interface IUser {
  _id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

// ✅ Category type
export interface ICategory {
    _id: string
    name: string
    slug: string
    status: CategoryStatus
    parentId: object | null
    brands: IBrand[]
    createdBy: IUser
}

const CategoryListingPage = () => {
const [data, setData] = useState<ICategory[]>([]);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [search, setSearch] = useState<string>("");
const [loading, setLoading] = useState<boolean>(true);

const navigate = useNavigate();

    const onDeleteConfirm = async (categoryId: string) => {
      setLoading(true);
       try {
        const response = await categorySvc.deleteRequest(`/category/${categoryId}`);
        if(response?.data) {
            toast.success('Category deleted successfully!', {
              description: "The category has been removed from the listing.",
            });
            // Refresh the category list after deletion
            getCategoryList({ page: pagination.current, limit: pagination.pageSize, search: search ?? null });
        }
        

       } catch (exception) {
          toast.error('Failed to delete the category. Please try again.', {
            description: "If the problem persists, contact support.",
          });
       } finally {
        setLoading(false);
       }
        

    };

    const columns: TableProps<ICategory>["columns"] = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Slug",
        dataIndex: "slug",
        key: "slug",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: CategoryStatus) => (
          <span className={`px-4 py-2 rounded-full text-white ${status === "active" ? "bg-green-200! text-green-700!" : "bg-red-200! text-red-700!"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ),
      },
      {
        title: "ParentId",
        dataIndex: "parentId",
        key: "parentId",
        render: (_: any, record: ICategory) => record.parentId ? record.parentId : 'N/A',
      },
      {        
        title: "Brands",
        dataIndex: "brands",
        key: "brands",
        render: (_: any, record: ICategory) => record.brands.length > 0 ? record.brands.map(brand => brand.name).join(", ") : 'N/A',
      },
      {
        title: "Created By",
        dataIndex: ["createdBy", "name"],
        key: "createdBy",
        render: (_: any, record: ICategory) => record.createdBy.name,
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "_id",
        render: (val: string) => (
          <div className="flex gap-4">
            <Button shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/admin/categories/${val}`)} className="bg-teal-700! text-white! p-5!" />
            <Space size="middle">
                <Popconfirm
                  title="Are you sure?"
                  description="Once deleted, you will not be able to recover this category!"
                  onConfirm={() => {
                    onDeleteConfirm(val);
                  }}
                  okText="Confirm!"
                  showCancel={false}
                >
                    <Button shape="circle" icon={<DeleteOutlined />}  className="bg-red-700! text-white! p-5!" />
                </Popconfirm>
            </Space>
          </div>
        ),
      }
    ];

// static data to simulate API data
//  {
//     "_id": "686a6cf7375ab12a186cc539",
//     "name": "smart Phone",
//     "status": "active",
//     "slug": "smart-phone",
//     "parentId": {},
//     "brands": [
//         {
//             "_id": "6849b0723ce056359cb17bc4",
//             "name": "colors",
//             "slug": "colors",
//             "logo": "https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/brand/s45etbcojzzca9cune1v?_a=BAMClqXy0",
//             "status": "active"
//         },
//     ],
//     "createdBy": {
//         "_id": "68300d57c51596322ac9dd91",
//         "name": "Tika Ram Khojwar",
//         "email": "khojwartikaram@gmail.com",
//         "role": "admin",
//         "status": "ACTIVE"
//     }
// },


    // dynamic data using API call
    
    const getCategoryList = async ({page = paginationDefault.page, limit = paginationDefault.limit, search = null}: {page?: number; limit?: number; search?: string | null}): Promise<void> => {
      setLoading(true);
      try {
        const response = await categorySvc.getRequest('/category', { 
            params: { page, limit, search } 
        });

        console.log(response.data);
        
        if(response?.data) {
            setData(response.data);
        }

        if (response?.options) {
            setPagination({
                current: response?.options?.pagination?.current,
                pageSize: response?.options?.pagination?.limit,
                total: response?.options?.pagination?.total,
            });
        }
        
      } catch (exception) {
        toast.error('Failed to fetch category list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      getCategoryList({ page: paginationDefault.page, limit: paginationDefault.limit, search: search ?? null});
    }, [])


  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                Category Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={(value) => getCategoryList({ page: 1, limit: pagination.pageSize, search: value })}
                />
                <Button
                icon={<PlusOutlined />}
                size="middle"
                className="bg-teal-900! text-white! hover:bg-teal-700! w-full sm:w-auto"
                onClick={() => navigate('/admin/categories/create')}
                >
                Add Category
                </Button>
            </div>
        </div>

        {/* table */}
        <div>
          <Table<ICategory> 
            columns={columns} 
            dataSource={data} 
            rowKey="_id" 
            pagination={{
                position: ["bottomCenter"], 
                ...pagination,
                onChange: (page, pageSize) => {
                    getCategoryList({page: page, limit: pageSize});
                }
            }}
            loading={loading}
          />
        </div>
        
    </div>
  )
}

export default CategoryListingPage;


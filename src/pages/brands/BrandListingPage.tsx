import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Table,  type TableProps } from "antd"
import { useEffect, useState } from "react";
import { paginationDefault } from "../../config/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { brandSvc } from "../../services/brand.service";

// ✅ Enums for fixed values
export type BrandStatus = "active" | "inactive";

export type UserRole = "admin" | "seller" | "user";

export type UserStatus = "ACTIVE" | "INACTIVE";

// ✅ User type
export interface IUser {
  _id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

// ✅ Brand type
export interface IBrand {
  _id: string
  name: string
  slug: string
  logo: string
  status: BrandStatus
  createdBy: IUser
}



const BrandListingPage = () => {
const [data, setData] = useState<IBrand[]>([]);
const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
const [brandSearch] = useState<string>("");
const [loading, setLoading] = useState<boolean>(true);

const navigate = useNavigate();

    const onDeleteConfirm = async (brandId: string) => {
      setLoading(true);
       try {
        const response = await brandSvc.deleteRequest(`/brand/${brandId}`);
        if(response?.data) {
            toast.success('Brand deleted successfully!', {
              description: "The brand has been removed from the listing.",
            });
            // Refresh the brand list after deletion
            getBrandList({ page: pagination.current, limit: pagination.pageSize, search: brandSearch ?? null });
        }
        

       } catch (exception) {
          toast.error('Failed to delete the brand. Please try again.', {
            description: "If the problem persists, contact support.",
          });
       } finally {
        setLoading(false);
       }
        

    };

    const columns: TableProps<IBrand>["columns"] = [
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
        render: (status: BrandStatus) => (
          <span className={`px-4 py-2 rounded-full text-white ${status === "active" ? "bg-green-200! text-green-700!" : "bg-red-200! text-red-700!"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ),
      },
      {
        title: "Logo",
        dataIndex: "logo",
        key: "logo",
        render: (logo: string) => <img src={logo} alt="logo" style={{ width: 50 }} />,
      },
      {
        title: "Created By",
        dataIndex: ["createdBy", "name"],
        key: "createdBy",
        render: (_: any, record: IBrand) => record.createdBy.name,
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "_id",
        render: (val: string) => (
          <div className="flex gap-4">
            <Button shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/admin/brand/${val}`)} className="bg-teal-700! text-white! p-5!" />
            <Space size="middle">
                <Popconfirm
                  title="Delete the brand"
                  description="Are you sure to delete this brand?"
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
    // const data: IBrand[] = [
    //   {
    //     _id: "6849b0723ce056359cb17bc4",
    //     name: "colors",
    //     status: "active",
    //     slug: "colors",
    //     logo:"https://res.cloudinary.com/dmr8kzy5n/image/upload/c_scale,w_500/f_auto,q_auto/v1/api-42/brand/s45etbcojzzca9cune1v?_a=BAMClqXy0",
    //     createdBy: {
    //       _id: "68300d57c51596322ac9dd91",
    //       name: "Tika Ram Khojwar",
    //       email: "khojwartikaram@gmail.com",
    //       role: "admin",
    //       status: "ACTIVE",
    //     },
    //   },
    // ];

    // dynamic data using API call
    const getBrandList = async ({page = paginationDefault.page, limit = paginationDefault.limit, search = null}: {page?: number; limit?: number; search?: string | null}): Promise<void> => {
      setLoading(true);
      try {
        const response = await brandSvc.getRequest('/brand', { 
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
        toast.error('Failed to fetch brand list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      getBrandList({ page: paginationDefault.page, limit: paginationDefault.limit, search: brandSearch ?? null});
    }, [])


  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                Brand Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                />
                <Button
                icon={<PlusOutlined />}
                size="middle"
                className="bg-teal-900! text-white! hover:bg-teal-700! w-full sm:w-auto"
                onClick={() => navigate('/admin/brands/create')}
                >
                Add Brand
                </Button>
            </div>
        </div>

        {/* table */}
        <div>
          <Table<IBrand> 
            columns={columns} 
            dataSource={data} 
            rowKey="_id" 
            pagination={{
                position: ["bottomCenter"], 
                ...pagination,
                onChange: (page, pageSize) => {
                    getBrandList({page: page, limit: pageSize});
                }
            }}
            loading={loading}
          />
        </div>
        
    </div>
  )
}

export default BrandListingPage
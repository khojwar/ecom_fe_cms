
// import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Input, Popconfirm, Space, Table,  type TableProps } from "antd"
import { useEffect, useState } from "react";
import { paginationDefault } from "../../config/constants";
import { toast } from "sonner";
// import { useNavigate } from "react-router";
import { userSvc } from "../../services/user.service";

// ✅ Enums for fixed values
export type UserStatus = "active" | "inactive";

export type UserRole = "admin" | "seller" | "user" | "customer";

export type UserGender = "male" | "female" | "other";


export interface IImage {
        secureUrl: string;
        publicId: string;
        optimizedUrl: string;
    }

export interface IAddress {
        billingAddress: string;
        shippingAddress: string;
    }

export interface IUserCreator {
  _id: string;
  name: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    address: IAddress,
    phone: string;
    gender: UserGender;
    dob: string | null;
    image: IImage,
    createdBy?: IUserCreator;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}



const UserListingPage = () => {
    const [data, setData] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    // const navigate = useNavigate();

    const onDeleteConfirm = async (userId: string) => {
      setLoading(true);
       try {
        const response = await userSvc.deleteRequest(`/user/${userId}`);
        if(response?.data) {
            toast.success('User deleted successfully!', {
              description: "The user has been removed from the listing.",
            });
            // Refresh the user list after deletion
            getUserList({ page: pagination.current, limit: pagination.pageSize, search: search ?? null });
        }
        

       } catch (exception) {
          toast.error('Failed to delete the user. Please try again.', {
            description: "If the problem persists, contact support.",
          });
       } finally {
        setLoading(false);
       }
    };

    const columns: TableProps<IUser>["columns"] = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: UserStatus) => (
          <span className={`px-4 py-2 rounded-full text-white ${status === "active" ? "bg-green-200! text-green-700!" : "bg-red-200! text-red-700!"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ),
      },
      {
        title: "Address",
        dataIndex: ["address", "billingAddress"],
        key: "address",
        render: (_: any, record: IUser) => record.address.billingAddress,
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender"
      },
      {
        title: "DOB",
        dataIndex: "dob",
        key: "dob"
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (_, record: IUser) => record.image ? <img src={record.image.secureUrl} alt="user image" style={{ width: 50 }} /> : null,
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
        render: (_, record: IUser) => record.createdBy?.name || 'N/A',
      },
      {
        title: "Action",
        key: "action",
        dataIndex: "_id",
        render: (val: string) => (
          <div className="flex gap-4">
            {/* <Button shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/admin/users/${val}`)} className="bg-teal-700! text-white! p-5!" /> */}
            <Space size="middle">
                <Popconfirm
                  title="Are you sure?"
                  description="Once deleted, you will not be able to recover this user!"
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

    // dynamic data using API call
    const getUserList = async ({page = paginationDefault.page, limit = paginationDefault.limit, search = null}: {page?: number; limit?: number; search?: string | null}): Promise<void> => {
      setLoading(true);
      try {
        const response = await userSvc.getRequest('/user', { 
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
        toast.error('Failed to fetch user list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      getUserList({ page: paginationDefault.page, limit: paginationDefault.limit, search: null});
    }, [])


  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                User Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                onSearch={(value) => {
                    setSearch(value);
                    getUserList({ page: paginationDefault.page, limit: paginationDefault.limit, search: value ?? null });
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                {/* <Button
                icon={<PlusOutlined />}
                size="middle"
                className="bg-teal-900! text-white! hover:bg-teal-700! w-full sm:w-auto"
                onClick={() => navigate('/admin/users/create')}
                >
                Add User
                </Button> */}
            </div>
        </div>

        {/* table */}
        <div>
          <Table<IUser> 
            columns={columns} 
            dataSource={data} 
            rowKey="_id" 
            pagination={{
                position: ["bottomCenter"], 
                ...pagination,
                onChange: (page, pageSize) => {
                    getUserList({page: page, limit: pageSize, search: search ?? null});
                }
            }}
            loading={loading}
          />
        </div>
        
    </div>
  )
}

export default UserListingPage
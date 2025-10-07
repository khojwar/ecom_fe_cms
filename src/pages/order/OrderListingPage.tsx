import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { paginationDefault } from "../../config/constants";
import orderSvc from "../../services/order.service";
import { toast } from "sonner";
import formatCurrency from "../../services/currencyFormat.service";

export interface getOrderProps {
  page?: number; 
  limit?: number; 
  search?: string | null
}

export type buyerStatus = "active" | "inactive";
export type buyerRole = "admin" | "seller" | "customer";
export type orderStatus = 'pending' |'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface IBuyer {
    address: {
      billingAddress: string;
      shippingAddress: string;
    };
    image: {
      secureUrl: string;
      publicId: string;
      optimizedUrl: string;
    };
    _id: string;
    name: string;
    email: string;
    role: buyerRole;
    status: buyerStatus;
    phone: string;
  };

export interface Iorder {
  _id: string;
  code: string;
  buyer: IBuyer;
  grossTotal: Number;
  discount: Number;
  deliveryCharge: Number;
  serviceCharge: Number;
  subTotal: Number;
  tax: Number;
  total: Number;
  status: orderStatus;
  isPaid: Boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

const OrderListingPage = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Iorder[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const navigate = useNavigate();


    const getOrderList = async ({page = paginationDefault.page, limit = paginationDefault.limit, search = null}: getOrderProps): Promise<void> => {
      setLoading(true);
      try {
        const response = await orderSvc.getRequest('/order', { 
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
        toast.error("Failed to fetch orders. Please try again.", {
          description: "If the problem persists, contact support.",
        });
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    getOrderList({page:paginationDefault.page, limit:paginationDefault.limit, search: search?? null});
  }, []);


const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Buyer',
    dataIndex: 'buyer',
    key: 'buyer',
    render: (buyer: IBuyer) => (buyer.name)
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (total: number) => (`Rs. ${formatCurrency((total/100))}`)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: orderStatus) => {
      const statusClasses = {
        pending: 'bg-yellow-500/20 text-yellow-700',
        confirmed: 'bg-blue-500/20 text-blue-700',
        shipped: 'bg-purple-500/20 text-purple-700',
        delivered: 'bg-green-500/20 text-green-700',
        cancelled: 'bg-red-500/20 text-red-700',
      };

      return (
        <div
          className={`px-4 py-1.5 rounded-full text-white text-sm text-center ${statusClasses[status]}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    title: 'Paid',
    dataIndex: 'isPaid',
    key: 'isPaid',
    render: (isPaid: boolean) => (isPaid ? "Yes" : "No"),
  }, 
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => new Date(date).toLocaleString(),
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "_id",
    render: (val: string) => (
      <div className="flex gap-4">
        <Button shape="circle" icon={<EyeOutlined />} onClick={() => navigate(`/admin/orders/${val}`)} className="bg-teal-700! text-white! p-5!" />
      </div>
    ),
  }
];

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                Order Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={(value) => getOrderList({ page: 1, limit: pagination.pageSize, search: value })}
                />
                <Button
                icon={<PlusOutlined />}
                size="middle"
                className="bg-teal-900! text-white! hover:bg-teal-700! w-full sm:w-auto"
                onClick={() => navigate('/admin/order/create')}
                >
                Add Order
                </Button>
            </div>
        </div>


        {/* table */}
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey="_id" 
          pagination={{
                position: ["bottomCenter"], 
                ...pagination,
                onChange: (page, pageSize) => {
                    getOrderList({page: page, limit: pageSize});
                }
            }}
            loading={loading} 
            />;
      
    </div>
  )
}

export default OrderListingPage
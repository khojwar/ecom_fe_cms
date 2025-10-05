import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { paginationDefault } from "../../config/constants";
import { toast } from "sonner";
import { tranctionSvc } from "../../services/transaction.service";


export interface GetTransactionListProps {
  page?: number,
  limit?: number,
  search?: null | string,
}

export type orderStatus = 'pending' |'confirmed' | 'shipped' | 'delivered' | 'cancelled';


export interface ITransaction {
            _id: string
            order: {
                _id: string
                code: string
                subTotal: number
                total: number
                status: orderStatus
                isPaid: boolean
            },
            transactionCode: string
            paymentMethod: string
            status: orderStatus
            amount: string
            response: string
            createdAt: string
            updatedAt: string
            __v: string
        }

const TransactionListingPage = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ITransaction[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const columns = [
    {
      title: 'Transaction Code',
      dataIndex: 'transactionCode',
      key: 'transactionCode',
    },
    {
      title: 'Order Code',
      dataIndex: 'order',
      key: 'order',
      render: (order: any) => (order.code)
    },
    {
      title: 'Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method: string) => (method.toUpperCase())
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (`Rs. ${(amount/100).toFixed(2)}`)
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  const getTransactionList = async ({page=paginationDefault.page, limit=paginationDefault.limit, search=null}: GetTransactionListProps): Promise<void> => {
      setLoading(true);
      try {
        const response = await tranctionSvc.getRequest('/transaction', { 
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

  };

  useEffect(()=>{
    getTransactionList({page:paginationDefault.page, limit:paginationDefault.limit});
  }, [])

  return (
    <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-teal-900 gap-4 sm:gap-0 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-teal-900">
                Transaction Listing
            </h1>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 my-2 sm:my-0">
                <Input.Search
                placeholder="Search"
                variant="filled"
                className="w-full sm:w-60"
                onSearch={(value) => {
                    getTransactionList({ page: paginationDefault.page, limit: paginationDefault.limit, search: value ?? null });
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <Table 
        dataSource={data} 
        columns={columns} 
        rowKey="_id" 
        pagination={{
                position: ["bottomCenter"], 
                ...pagination,
                onChange: (page, pageSize) => {
                    getTransactionList({page: page, limit: pageSize});
                }
            }}
            loading={loading} 
        />

    </div>
  )
}

export default TransactionListingPage
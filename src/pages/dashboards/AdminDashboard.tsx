
import { Table } from 'antd';
import { useAuth } from '../../context/auth.context';
import { useEffect, useMemo, useState } from 'react';
import StatCard from '../../components/Card';
import { tranctionSvc } from '../../services/transaction.service';
import { toast } from 'sonner';
import orderSvc from '../../services/order.service';
import { productSvc } from '../../services/product.service';
import { userSvc } from '../../services/user.service';
import { Line } from '@ant-design/plots';
import dayjs from "dayjs";


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

export type buyerStatus = "active" | "inactive";
export type buyerRole = "admin" | "seller" | "customer";

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


interface Attribute {
  key: string;
  value: string[]; // instead of [] (which means "any[]")
  id: string;
}

interface ICategory {
  _id: string;
  name: string;
  status: string;
  slug: string;
  parentId: string;
  createdBy: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  discount: string;
  afterDiscount: string;
  tag: string[];             // better than []
  stock: string;
  attributes: Attribute[];
  sku: string;
  homeFeature: string;
  status: string;
  seller: {
      _id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      image: string;
    };
  category: ICategory[];
  brand: string;
  images: (string | null)[]; // array of image URLs or null
  createdBy: User;
  updatedBy: string;
}

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

const convertTransactionData = (transactions: ITransaction[]) => {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    last7Days.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
  }

  const dailyData: Record<string, number> = {};
  last7Days.forEach(day => {
    dailyData[day] = 0;
  });

  transactions.forEach((t) => {
    const day = dayjs(t.createdAt).format('YYYY-MM-DD');
    if (dailyData.hasOwnProperty(day)) {
      const amount = parseFloat(t.amount) || 0;
      dailyData[day] += amount;
    }
  });

  const formattedData = last7Days.map(day => ({
    date: day,
    value: dailyData[day],
  }));

  return formattedData;
};


const AdminDashboard = () => {
  const [query, setQuery] = useState<string>("");
  const [transactionData, setTransactionData] = useState<ITransaction[]>([])
  const [orderData, setOrderData] = useState<Iorder[]>([]);
  const [recentOrderData, SetRecentOrderData] = useState<Iorder[]>([])
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [chartData, setChartData] = useState<{ date: string; value: number }[]>([])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  // const { loggedInUser } = useAuth();


  const getUserList = async (): Promise<void> => {
      try {
        const response = await userSvc.getRequest('/user');

        console.log(response.data);
        
        if(response?.data) {
            setUserData(response.data);
        }

        
      } catch (exception) {
        toast.error('Failed to fetch user list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } 
    }

  const getProductList = async (): Promise<void>  => {
      try {
          const response = await productSvc.getRequest('/product');
          // console.log("product: ",response.data);

          if(response?.data) {
              setProductData(response.data);
          }

      } catch (exception) {
          toast.error('Failed to fetch product list. Please try again.', {
            description: "If the problem persists, contact support.",
          });
      } 
  };

  const getOrderList = async (): Promise<void> => {
    try {
      const response = await orderSvc.getRequest('/order');
      
      if(response?.data) {
          setOrderData(response.data);
      }
      
    } catch (exception) {
      toast.error("Failed to fetch orders. Please try again.", {
        description: "If the problem persists, contact support.",
      });
    }
  }

  const getRecentOrders = async (): Promise<void> => {
  try {
    const response = await orderSvc.getRequest('/order', { 
      params: { page: 1, limit: 5, sort: 'desc' } // 👈 requesting 5 latest orders
    });

    if (response?.data) {
      SetRecentOrderData(response.data);
    }
  } catch (exception) {
    toast.error("Failed to fetch recent orders.", {
      description: "If the problem persists, contact support.",
    });
  } 
};


  const getTransactionList = async (): Promise<void> => {
      try {
        const response = await tranctionSvc.getRequest('/transaction');

        if(response?.data) {
            const data = Array.isArray(response.data) ? response.data : response.data.data || [];
            setTransactionData(data);

            const chrtData = convertTransactionData(data);
            console.log("chart data", chrtData);
            setChartData(chrtData);
        }
        
      } catch (exception) {
        toast.error('Failed to fetch brand list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } 
  };

  const transactions = useMemo(() => transactionData.filter((t) => (t.transactionCode || "").toLowerCase().includes(query.toLowerCase())), [query, transactionData]);
  // console.log("transaction: ", transactions);
  
  const totalRevenue = useMemo(() => transactions.reduce((s, t) => s + (Number(t.amount) || 0), 0), [transactions]).toFixed(2);

  

  useEffect(()=>{
    getTransactionList();
    getOrderList();
    getRecentOrders();
    getProductList();
    getUserList();
  }, [])

// for chart data
  const config = {
    data: chartData,
    title: {
      text: 'Sales (Last 7 days)',
    },
    xField: 'date',
    yField: 'value',
    shapeField: 'smooth',
    height: 350,
    scale: {
      y: {
        domainMin: 0,
      },
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
      stroke: '#1890ff',
    },
  };

      // Populate top products
    const topProducts = [
      {id:1, name:'Wireless Headphones', sold:312},
      {id:2, name:'Running Shoes', sold:210},
      {id:3, name:'Smart Watch', sold:190},
      {id:4, name:'Backpack', sold:150}
    ];

      // Populate recent activity
    const activity = [
      '🧾 Order #A1243 placed by Sanjay',
      '👤 New customer: Priya Sharma',
      '📦 Order #A1240 marked shipped',
    ];

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
        render: (total: number) => (`Rs. ${(total/100).toFixed(2)}`)
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
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => new Date(date).toLocaleString(),
      },
    ];



  return (
    <>
        {/* <div className='flex gap-4 justify-center items-center'>
          <Input.Search
            placeholder="search order, product or customers..."
            size='middle'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <span >Welcome back,</span>
            <span className='bg-blue-700/20 text-blue-700 h-12 w-12 rounded-full flex justify-center items-center font-bold shadow-2xl'>
              {loggedInUser?.name
                .split(" ")
                .map(word => word[0].toUpperCase())
                .join("")}
            </span>
          </div>
        </div> */}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Revenue" value={`Rs. ${formatCurrency(Number(totalRevenue))}`} subtitle={`Transactions: ${transactionData.length}`} />
          <StatCard title="Total Orders" value={orderData.length} subtitle="Placed orders" />
          <StatCard title="Products" value={productData.length} subtitle="Listed items" />
          <StatCard title="Total Users" value={userData.length} subtitle="Active users on platform" />
        </div>


        <div className='flex mt-4 gap-4 '>
          <div className='w-2/3 p-4 shadow-md rounded-2xl border border-gray-100'>
              <h1 className='text-xl font-bold'>Sales (Last 7 days)</h1>
              <Line {...config} />;
          </div>
          <div className='w-1/3 shadow-md rounded-2xl border border-gray-100 p-4'>
                <div>
                  <h1 className='mb-4 font-bold'>Top Products</h1>
                    <ul className='flex flex-col'>
                      {
                        topProducts.map((tp) => (
                          <li key={tp.id} className='text-2xl'>{tp.name} - {tp.sold}</li>
                        ))
                      }
                    </ul>
                  </div>

                  <div className='mt-4'>
                    <h1 className='mb-4 font-bold'>Recent Activity</h1>
                    <p className='mb-4'>New user signup and order events appear here</p>
                    <ul className='flex flex-col gap-4'>
                      {
                        activity.map((a, index) => (
                          <li key={index} className=''>{a}</li>
                        ))
                      }
                    </ul>
                  </div>

          </div>
        </div>

        <div className='p-4 shadow-md rounded-2xl border border-gray-100 my-4'>
          <h1 className='font-bold mb-4'>Recent Orders</h1>
          
          <Table dataSource={recentOrderData} columns={columns} />
        </div>

        

    </>
  )
}

export default AdminDashboard
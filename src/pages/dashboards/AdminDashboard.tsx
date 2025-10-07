
import { Table, Input, Drawer, Button, List } from 'antd';
import { useAuth } from '../../context/auth.context';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import StatCard from '../../components/Card';
import { tranctionSvc } from '../../services/transaction.service';
import { toast } from 'sonner';
import orderSvc from '../../services/order.service';
import { productSvc } from '../../services/product.service';
import { userSvc } from '../../services/user.service';
import { Line } from '@ant-design/plots';
import dayjs from "dayjs";
import formatCurrency from '../../services/currencyFormat.service';


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
  createdBy: IUser;
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
  const [totalProductStock, setTotalProductStock] = useState<number>(0);
  const [userData, setUserData] = useState<IUser[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const [chartData, setChartData] = useState<{ date: string; value: number }[]>([])
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState<string>('');
  const [drawerContentType, setDrawerContentType] = useState<'products' | 'activity' | null>(null);



  const truncate = (text: string, max = 30) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max - 1) + '…' : text;
  };

  const { loggedInUser } = useAuth();

  const getUserList = async (): Promise<void> => {
      try {
    const response = await userSvc.getRequest('/user', { params: { page: 1, limit: 10000 } });

        console.log(response.data);
        
        const items = Array.isArray(response?.data) ? response.data : (response?.data?.data ?? []);
        setUserData(items);
        const total = response?.options?.pagination?.total ?? (Array.isArray(items) ? items.length : 0);
        setTotalUsersCount(total);
      } catch (exception) {
        toast.error('Failed to fetch user list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } 
    }

  const getProductList = async (): Promise<void>  => {
      try {
          const response = await productSvc.getRequest('/product', { params: { page: 1, limit: 10000 } });
          // console.log("product: ",response.data);

          const items = Array.isArray(response?.data) ? response.data : (response?.data?.data ?? []);
          setProductData(items);
          const stockSum = Array.isArray(items) ? items.reduce((s: number, p: any) => s + (Number(p.stock) || 0), 0) : 0;
          setTotalProductStock(stockSum);

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

    // Populate top products dynamically from productData (use stock as a proxy for popularity)
    const topProducts = useMemo(() => {
      return productData
        .map((p) => ({
          id: p._id,
          name: (p as any).title || (p as any).name || p.slug || p._id,
          // prefer real sales counts if API provides (sold, sales), fall back to stock
          sold: Number((p as any).sold ?? (p as any).sales ?? (p as any).stock) || 0,
        }))
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 3);
    }, [productData]);

    // Populate recent activity dynamically from recent orders, users and transactions
    const activity = useMemo(() => {
      const entries: { ts: number; msg: string }[] = [];

      recentOrderData.forEach((o) => {
        const ts = o.createdAt ? new Date(o.createdAt).getTime() : 0;
        const buyerName = (o.buyer && (o.buyer as any).name) || (o as any).buyer || 'Unknown';
        entries.push({ ts, msg: `🧾 Order ${o.code} placed by ${buyerName}` });
      });

      // recent users
      userData
        .slice()
        .sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tb - ta;
        })
        .slice(0, 5)
        .forEach((u) => {
          const ts = u.createdAt ? new Date(u.createdAt).getTime() : 0;
          entries.push({ ts, msg: `👤 New customer: ${u.name}` });
        });

      // transactions
      transactionData
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .forEach((t) => {
          const ts = t.createdAt ? new Date(t.createdAt).getTime() : 0;
          entries.push({ ts, msg: `💸 Transaction ${t.transactionCode} ${t.status} — Rs. ${t.amount}` });
        });

      return entries.sort((a, b) => b.ts - a.ts).slice(0, 8).map((e) => e.msg);
    }, [recentOrderData, userData, transactionData]);

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
        <div className='flex gap-4 justify-between items-center'>
          <Input.Search
            placeholder="search order, product or customers..."
            size='middle'
            className='w-5/6!'
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
          <div className="flex items-center justify-end gap-2 w-1/6">
            <span >Welcome back,</span>
            <span className='bg-blue-700/20 text-blue-700 h-12 w-12 rounded-full flex justify-center items-center font-bold shadow-2xl'>
              {loggedInUser?.name
                .split(" ")
                .map(word => word[0].toUpperCase())
                .join("")}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Revenue" value={`Rs. ${formatCurrency(Number(totalRevenue))}`} subtitle={`Transactions: ${transactionData.length}`} />
          <StatCard title="Total Orders" value={orderData.length} subtitle="Placed orders" />
          <StatCard title="Products" value={totalProductStock} subtitle="Total stock" />
          <StatCard title="Total Users" value={totalUsersCount} subtitle="Active users on platform" />
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
                          <li key={tp.id} className='text-lg'>
                            <span className='font-medium'>{truncate(tp.name, 30)}</span>
                            <span className='ml-2 text-sm text-gray-500'>- {tp.sold}</span>
                          </li>
                        ))
                      }
                    </ul>
                    <div className='mt-3'>
                      <Button size='small' type='link' onClick={() => { setDrawerTitle('Top Products'); setDrawerContentType('products'); setDrawerVisible(true); }}>See more</Button>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <h1 className='mb-4 font-bold'>Recent Activity</h1>
                    <p className='mb-4'>New user signup and order events appear here</p>
                    <ul className='flex flex-col gap-4'>
                      {
                        activity.slice(0, 3).map((a, index) => (
                          <li key={index} className=''>{a}</li>
                        ))
                      }
                    </ul>
                    <div className='mt-3'>
                      <Button size='small' type='link' onClick={() => { setDrawerTitle('Recent Activity'); setDrawerContentType('activity'); setDrawerVisible(true); }}>See more</Button>
                    </div>
                  </div>

          </div>
        </div>

        <div className='p-4 shadow-md rounded-2xl border border-gray-100 my-4'>
          <h1 className='font-bold mb-4'>Recent Orders</h1>
          
          <Table dataSource={recentOrderData} columns={columns} pagination={false} />
        </div>

        <Drawer
          title={drawerTitle}
          placement='right'
          width={480}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          {drawerContentType === 'products' && (
            <List
              dataSource={productData.sort((a, b) => (Number((b as any).sold ?? (b as any).sales ?? b.stock) - Number((a as any).sold ?? (a as any).sales ?? a.stock)))}
              renderItem={(p) => (
                <List.Item>
                  <div className='w-full'>
                    <div className='font-medium'>{(p as any).title || (p as any).name || p.slug}</div>
                    <div className='text-sm text-gray-500'>Sold: {(p as any).sold ?? (p as any).sales ?? p.stock}</div>
                  </div>
                </List.Item>
              )}
            />
          )}

          {drawerContentType === 'activity' && (
            <List
              dataSource={activity}
              renderItem={(item) => (
                <List.Item>
                  <div>{item}</div>
                </List.Item>
              )}
            />
          )}
        </Drawer>

        

    </>
  )
}

export default AdminDashboard
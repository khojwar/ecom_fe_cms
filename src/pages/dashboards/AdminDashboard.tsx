
import { Input } from 'antd';
import { useAuth } from '../../context/auth.context';
import { useEffect, useMemo, useState } from 'react';
import StatCard from '../../components/Card';
import { tranctionSvc } from '../../services/transaction.service';
import { toast } from 'sonner';


export type Role = "admin" | "customer" | "seller";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type TransactionMode = "cod" | "esewa" | "khalti" | "bank" | "connect" | string;
export type TransactionStatus = "pending" | "success" | "failed" | string;

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  parentId?: string | null;
  icons?: string[];
  brands?: string[];
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  address?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  password?: string;
  status?: string;
  activationToken?: string | null;
  forgetPasswordToken?: string | null;
  expiryTime?: string | null;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pat {
  id: string;
  userId: string;
  access: string;
  refreshToken?: string;
  expiryToken?: string;
  device?: string;
}

export interface Product {
  id: string;
  title: string;
  slug?: string;
  description?: string;
  price: number;
  discount?: number;
  afterDiscount?: number;
  category?: string;
  tag?: string[];
  stock?: number;
  seller?: string;
  brand?: string;
  attributes?: Record<string, string | number>[];
  images?: string[];
  sku?: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  code: string;
  buyer: string; // user id
  grossTotal: number;
  discounts?: number;
  deliveryCharge?: number;
  serviceCharge?: number;
  subTotal?: number;
  tax?: number;
  total: number;
  status: OrderStatus;
  isPaid: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderDetail {
  id: string;
  order?: string | null; // order id (null => cart)
  buyer: string;
  product: string; // product id
  quantity: number;
  price: number;
  deliveryCharge?: number;
  subTotal?: number;
  total?: number;
  status?: string;
  seller?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}


const mockUsers: User[] = [
  { id: "u1", name: "Alice Admin", role: "admin", email: "alice@shop.com", phone: "9800000001", createdAt: "2025-01-01" },
  { id: "u2", name: "Sam Seller", role: "seller", email: "sam@seller.com", phone: "9800000002", createdAt: "2025-03-02" },
  { id: "u3", name: "Chris Customer", role: "customer", email: "chris@cust.com", phone: "9800000003", createdAt: "2025-05-10" },
];

const mockProducts: Product[] = [
  { id: "p1", title: "Road Bike", price: 1200, discount: 100, afterDiscount: 1100, stock: 10, seller: "u2", brand: "b1", sku: "RB-001", createdAt: "2025-02-14" },
  { id: "p2", title: "Helmet", price: 80, discount: 0, afterDiscount: 80, stock: 50, seller: "u2", brand: "b2", sku: "HL-050", createdAt: "2025-04-01" },
];

const mockOrders: Order[] = [
  { id: "o1", code: "ORD-1001", buyer: "u3", grossTotal: 1180, discounts: 0, deliveryCharge: 20, serviceCharge: 0, subTotal: 1200, tax: 0, total: 1200, status: "pending", isPaid: false, createdAt: "2025-06-01" },
  { id: "o2", code: "ORD-1002", buyer: "u3", grossTotal: 80, discounts: 0, deliveryCharge: 0, serviceCharge: 0, subTotal: 80, tax: 0, total: 80, status: "confirmed", isPaid: true, createdAt: "2025-06-10" },
];



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

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionData, setTransactionData] = useState<ITransaction[]>([])

  const { loggedInUser } = useAuth();



  const getTransactionList = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await tranctionSvc.getRequest('/transaction');

        console.log(response.data);

        if(response?.data) {
            const data = Array.isArray(response.data) ? response.data : response.data.data || [];
            setTransactionData(data);
        }
        
      } catch (exception) {
        toast.error('Failed to fetch brand list. Please try again.', {
          description: "If the problem persists, contact support.",
        });
      } finally {
        setLoading(false);
      }
  };

  const transactions = useMemo(() => transactionData.filter((t) => (t.transactionCode || "").toLowerCase().includes(query.toLowerCase())), [query, transactionData]);
  // console.log("transaction", transactions);
  
  const totalRevenue = useMemo(() => transactions.reduce((s, t) => s + (Number(t.amount) || 0), 0), [transactions]);

  


  useEffect(()=>{
    getTransactionList();
  }, [])



  return (
    <>
        <div className='flex gap-4 justify-center items-center'>
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
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={mockUsers.length} subtitle="Active users on platform" />
          <StatCard title="Products" value={mockProducts.length} subtitle="Listed items" />
          <StatCard title="Revenue" value={`Rs. ${totalRevenue}`} subtitle={`Transactions: ${transactionData.length}`} />
          <StatCard title="Total Orders" value={mockOrders.length} subtitle="Placed orders" />
        </div>

    </>
  )
}

export default AdminDashboard
import { AppstoreOutlined, MessageOutlined, PictureOutlined, ProfileOutlined, ShoppingOutlined, StarOutlined, SwapOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router";


export const AdminMenu = [
            { key: "1", icon: <AppstoreOutlined />, label: <NavLink to="/admin">DashBoard</NavLink> },
            { key: "2", icon: <PictureOutlined />, label: <NavLink to="/admin/banners">Banners</NavLink> },
            { key: "3", icon: <StarOutlined />, label: <NavLink to="/admin/brands">Brands</NavLink> },
            { key: "4", icon: <UnorderedListOutlined />, label: <NavLink to="/admin/categories">Categories</NavLink> },
            { key: "5", icon: <UserOutlined />, label: <NavLink to="/admin/users">Users</NavLink> },
            { key: "6", icon: <ShoppingOutlined />, label: <NavLink to="/admin/products">Products</NavLink> },
            { key: "7", icon: <ProfileOutlined />, label: <NavLink to="/admin/orders">Orders</NavLink> },
            { key: "8", icon: <SwapOutlined />, label: <NavLink to="/admin/transactions">Transactions</NavLink> },
            { key: "9", icon: <MessageOutlined />, label: <NavLink to="/admin/chat">Chat</NavLink> },
          ];

export const SellerMenu = [
        { key: "1", icon: <AppstoreOutlined />, label: <NavLink to="/seller">DashBoard</NavLink> },
        { key: "2", icon: <ShoppingOutlined />, label: <NavLink to="/seller/products">Products</NavLink> },
        { key: "3", icon: <ProfileOutlined />, label: <NavLink to="/seller/orders">Orders</NavLink> },
        { key: "4", icon: <MessageOutlined />, label: <NavLink to="/seller/chat">Chat</NavLink> },
        ];



export interface ImenuItems {
  key: string;
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
}

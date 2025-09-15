import { AppstoreOutlined, MessageOutlined, PictureOutlined, ProfileOutlined, ShoppingOutlined, StarOutlined, SwapOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";


export const AdminMenu = [
            { key: "1", icon: <AppstoreOutlined />, label: "DashBoard" },
            { key: "2", icon: <PictureOutlined />, label: "Banners" },
            { key: "3", icon: <StarOutlined />, label: "Brands" },
            { key: "4", icon: <UnorderedListOutlined />, label: "Categories" },
            { key: "5", icon: <UserOutlined />, label: "Users" },
            { key: "6", icon: <ShoppingOutlined />, label: "Products" },
            { key: "7", icon: <ProfileOutlined />, label: "Orders" },
            { key: "8", icon: <SwapOutlined />, label: "Transactions" },
            { key: "9", icon: <MessageOutlined />, label: "Chat" },
          ];

export const SellerMenu = [
        { key: "1", icon: <AppstoreOutlined />, label: "DashBoard" },
        { key: "2", icon: <ShoppingOutlined />, label: "Products" },
        { key: "3", icon: <ProfileOutlined />, label: "Orders" },
        { key: "4", icon: <MessageOutlined />, label: "Chat" },
        ];



export interface ImenuItems {
  key: string;
  icon?: React.ReactNode;
  label?: string;
}

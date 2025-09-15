import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";


const { Header, Sider, Content } = Layout;

const UserLayout = ({menu, sTitle, lTitle} : Readonly<{menu: Array<{
    key: string;
    icon: React.ReactNode;
    label: string;
}>, sTitle: string; lTitle: string; }>) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 bg-gray-800 mb-4 transition-all duration-300">
          <p
            className={`text-white font-bold hover:cursor-pointer shadow-2xl transition-all duration-300 ${
              collapsed ? "text-lg" : "text-2xl"
            }`}
          >
            {collapsed ? sTitle : lTitle}
          </p>
        </div>

        {/* Sidebar Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menu}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Child content loads here */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;


import {  Layout, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import type { ImenuItems } from "../../config/menu-items";
import UserHeader from "../../components/header/Header";


const { Content } = Layout;

const UserLayout = ({menu, sTitle, lTitle} : Readonly<{menu: Array<ImenuItems>, sTitle: string; lTitle: string; }>) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} sTitle={sTitle} lTitle={lTitle} menu={menu} />

      {/* Main Layout */}
      <Layout>
        <UserHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />


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

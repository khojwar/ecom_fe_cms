
import {  Layout, theme } from "antd";
import { Navigate, Outlet} from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import type { ImenuItems } from "../../config/menu-items";
import UserHeader from "../../components/header/Header";
import { useAuth } from "../../context/auth.context";
import { toast } from "sonner";


const { Content } = Layout;

const UserLayout = ({menu, role, sTitle, lTitle} : Readonly<{menu: Array<ImenuItems>, role: string, sTitle: string; lTitle: string; }>) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    if (loggedInUser.role == role) {
        return (
          <Layout className="h-screen">
            {/* Sidebar */}
            <Sidebar  sTitle={sTitle} lTitle={lTitle} menu={menu} />

            {/* Main Layout */}
                <Layout style={{ minHeight: 0 }}>
              <UserHeader colorBgContainer={colorBgContainer} />


              <Content
                style={{
                  margin: "24px 16px",
                      padding: 24,
                      minHeight: 0,
                      overflowY: 'auto',
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
    } else {
      toast.error("You do not have permission to access this page.");
      return <Navigate to={`/${loggedInUser.role}`} />;
    }
  } else {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" />;
  }
};

export default UserLayout;

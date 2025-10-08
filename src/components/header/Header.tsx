import {  MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import { useUserLayout } from '../../context/user-layout.context';
const { Header} = Layout;

const UserHeader = ({ colorBgContainer } : Readonly<{  colorBgContainer: string }>) => {
  const { collapsed, setCollapsed } = useUserLayout();
  return (
    <div>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
    </div>
  )
}

export default UserHeader
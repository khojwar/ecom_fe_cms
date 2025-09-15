import {  MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
const { Header} = Layout;

const UserHeader = ({ collapsed, setCollapsed, colorBgContainer } : Readonly<{ collapsed: boolean, setCollapsed: (collapsed: boolean) => void, colorBgContainer: string }>) => {
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
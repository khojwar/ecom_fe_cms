import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import type { ImenuItems } from '../../config/menu-items';


const Sidebar = ({ collapsed, sTitle, lTitle, menu }: Readonly<{ collapsed: boolean, sTitle: string, lTitle: string, menu: Array<ImenuItems> }>) => {
  return (
    <div>
        <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen">
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
    </div>
  )
}

export default Sidebar
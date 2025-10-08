import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import type { ImenuItems } from '../../config/menu-items';
import { useAuth } from '../../context/auth.context';
import { useUserLayout } from '../../context/user-layout.context';



const Sidebar = ({ sTitle, lTitle, menu }: Readonly<{  sTitle: string, lTitle: string, menu: Array<ImenuItems> }>) => {
  const { loggedInUser } = useAuth();

  const { collapsed} = useUserLayout();


  return (
    <div>
        <Sider trigger={null} collapsible collapsed={collapsed} className="h-screen">
            {/* Sidebar Header */}
            <div className="flex flex-col text-center py-4 bg-gray-800 mb-4">
              <p
                  className={`text-white font-bold hover:cursor-pointer shadow-2xl transition-all duration-300 ${
                  collapsed ? "text-lg" : "text-2xl"
                  }`}
              >
                  {collapsed ? sTitle : lTitle}
              </p>
              
              <div className={`flex flex-col items-center justify-center mt-4 transition-all duration-300 ${collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <p className='text-center text-teal-500 font-semibold'>{loggedInUser?.name}</p>
                <p className='text-center text-white font-light text-xs'>{loggedInUser?.email}</p>
              </div>
              

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
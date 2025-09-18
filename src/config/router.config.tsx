// import {BrowserRouter, Route, Routes} from 'react-router'
import { createBrowserRouter, RouterProvider } from 'react-router';
import PageNotFound from '../pages/PageNotFound';
import ActivateUser from '../pages/auth/ActivateUser';
import AuthLayout from '../pages/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { AdminMenu, SellerMenu } from './menu-items';
import UserLayout from '../pages/layout/UserLayout';
import { Toaster} from 'sonner';



const RoutConfig = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginForm />
            },
            {
                path: 'register',
                element: <RegisterForm />
            },
            {
                path: 'forget-password',
                element: <ForgotPasswordForm email="" />
            },
            {
                // parameterized route
                path: 'activate/:token',
                element: <ActivateUser />
            }
        ]
    },
    {
        path: '/admin',
        element: <UserLayout menu={AdminMenu} sTitle={"ADM"} lTitle={"Admin Panel"} />
    },
    {
        path: '/seller',
        element: <UserLayout menu={SellerMenu} sTitle={"SEL"} lTitle={"Seller Panel"} />
    },
    {
        // page not found
        path: '*',
        element: <PageNotFound />
    }
]);


const RouterConfig = () => {
    return (

        <> 
        <Toaster richColors closeButton />
        <RouterProvider router={RoutConfig} />

        {/* 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginForm />} />
           </Routes>
        </BrowserRouter> 
        */}

        </>
    )
}

export default RouterConfig;
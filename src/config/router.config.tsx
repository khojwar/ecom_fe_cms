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
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import BannerListingPage from '../pages/banners/BannerListingPage';
import BannerCreatePage from '../pages/banners/BannerCreatePage';
import BannerEditPage from '../pages/banners/BannerEditPage';
import BrandListingPage from '../pages/brands/BrandListingPage';
import BrandCreatePage from '../pages/brands/BrandCreatePage';
import BrandEditPage from '../pages/brands/BrandEditPage';
import CategoryListingPage from '../pages/categories/CategoryListingPage';
import CategoryCreatePage from '../pages/categories/CategoryCreatePage';
import CategoryEditPage from '../pages/categories/CategoryEditPage';
import UserListingPage from '../pages/users/UserListingPage';
import ProductListingPage from '../pages/product/ProductListingPage';
import ProductCreatePage from '../pages/product/ProductCreatePage';
import ProductEditPage from '../pages/product/ProductEditPage';
// import UserCreatePage from '../pages/users/UserCreatePage';
// import UserEditPage from '../pages/users/UserEditPage';


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
        element: <UserLayout role="admin" menu={AdminMenu} sTitle={"ADM"} lTitle={"Admin Panel"} />,
        children: [
            {index: true, element: <AdminDashboard /> },

            // banners
            {path: 'banners', element: <BannerListingPage /> },
            {path: 'banners/create', element: <BannerCreatePage /> },
            {path: 'banner/:id', element: <BannerEditPage /> },

            // brand routes
            {path: 'brands', element: <BrandListingPage /> },
            {path: 'brands/create', element: <BrandCreatePage /> },
            {path: 'brand/:id', element: <BrandEditPage /> },

            // categories
            {path: 'categories', element: <CategoryListingPage /> },
            {path: 'categories/create', element: <CategoryCreatePage /> },
            {path: 'categories/:id', element: <CategoryEditPage /> },

            // Users
            {path: 'users', element: <UserListingPage /> },
            // {path: 'users/create', element: <UserCreatePage /> },
            // {path: 'users/:id', element: <UserEditPage /> },

            // products
            {path: 'products', element: <ProductListingPage /> },
            {path: 'products/create', element: <ProductCreatePage /> },
            {path: 'products/:id', element: <ProductEditPage /> },

            // page not found
            {path: '*', element: <PageNotFound /> }
        ]
    },
    {
        path: '/seller',
        element: <UserLayout role="seller" menu={SellerMenu} sTitle={"SEL"} lTitle={"Seller Panel"} />
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
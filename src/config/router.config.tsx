// import {BrowserRouter, Route, Routes} from 'react-router'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router';
import LoginForm from '../pages/Login';
import PageNotFound from '../pages/PageNotFound';
import ActivateUser from '../pages/auth/ActivateUser';


const RoutConfig = createBrowserRouter([
    {
        path: '/',
        element: <LoginForm />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        // parameterized route
        path: '/activate/:token',
        element: <ActivateUser />
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
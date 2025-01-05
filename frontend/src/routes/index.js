import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUser from '../pages/AllUser';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetail from '../pages/ProductDetail';
import ViewCart from '../pages/ViewCart';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : '',
                element : <Home />
            },
            {
                path : 'login',
                element : <Login />
            },
            {
                path : 'forgot-password',
                element : <ForgotPassword />
            },
            {
                path : 'sign-up',
                element : <SignUp />
            },
            {
                path : 'product-category/:categoryName',
                element : <CategoryProduct />
            },
            {
                path : 'product',
                element : <ProductDetail />
            },
            {
                path : 'view-cart',
                element : <ViewCart />
            },
            {
                path : 'admin-panel/:id',
                element : <AdminPanel />,
                children : [
                    {
                        path : 'all-users',
                        element : <AllUser />
                    },
                    {
                        path : 'all-products',
                        element : <AllProducts />
                    }
                ]
            },
        ]
    }
])

export default router;
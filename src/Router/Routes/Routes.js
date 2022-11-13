import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Checkout from "../../pages/Checkout/Checkout";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Orders from "../../pages/Orders/Orders";
import SignUp from "../../pages/SignUp/SignUp";
import PrivateRouter from "../PrivateRouter/PrivateRouter";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/checkout/:id',
                element: <PrivateRouter><Checkout></Checkout></PrivateRouter>,
                loader: ({params}) => fetch(`https://genius-car-server-alpha.vercel.app/services/${params.id}`)
            },
            {
                path: '/orders',
                element: <PrivateRouter><Orders></Orders></PrivateRouter>
            }
        ]
    }
]);

export default routes;
import { createBrowserRouter, Navigate } from "react-router";
import Register from "./app/features/auth/pages/Register";
import Login from "./app/features/auth/pages/Login";
import CreateProduct from "./app/features/products/pages/CreateProduct";
import Dashboard from "./app/features/products/pages/Dashboard";
import Protected from "./app/features/auth/components/Protected";
import Home from "./app/features/products/pages/Home";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/create-product",
                element: <Protected role="seller"><CreateProduct/></Protected>
            },
            {
                path: "/seller/dashboard",
                element: <Protected role="seller"><Dashboard/></Protected>
            }
        ]
    },
    
])
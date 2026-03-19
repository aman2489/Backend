import {createBrowserRouter, Navigate} from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/home/pages/Home";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/",
        element:  <Home/> 
    },
    {
        path: "/dashboard",
        element: <Protected><Dashboard/></Protected>
    }
])
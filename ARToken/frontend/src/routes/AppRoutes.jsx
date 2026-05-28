import { createBrowserRouter, RouterProvider } from "react-router"
import AuthLayout from "../layouts/AuthLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Public from "./protected/Public"
import Protected from "./protected/Protected"
import { useEffect } from "react"
import { axiosInstance } from "../config/axiosInstance"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../state/Authreducer"


const AppRoutes = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try{
        const res = await axiosInstance.get("/api/auth/me");
        dispatch(addUser(res?.data?.user));
      }catch(err){
        dispatch(removeUser());
        console.log("Error in me api: ", err);
      }
    })()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public/>,
      children: [
        {
          path: "",
          element: <AuthLayout/>,
          children: [
            {
              path: "",
              element: <Login/>
            },
            {
              path: "/register",
              element: <Register/>
            }
          ]
        }
      ]
    },

    {
      path: "/home",
      element: <Protected/>,
      children: [
        {
          path: "",
          element: <MainLayout/>,
          children: [
            {
              path: "",
              element: <Home/>
            }
          ]
        }
      ]
    }
  ])

  return <RouterProvider router={router}/>
}

export default AppRoutes

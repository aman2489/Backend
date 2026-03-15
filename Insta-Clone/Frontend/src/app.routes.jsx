import {createBrowserRouter} from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import Feed from "./features/post/pages/Feed"
import CreatePost from "./features/post/pages/CreatePost"
import Profile from "./features/user/pages/Profile"
import Protected from "./features/shared/components/Protected"


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
        element: <Protected><Feed/></Protected>
    },
    {
        path: "/create-post",
        element: <CreatePost/>
    },
    {
        path: "/profile",
        element: <Protected><Profile/></Protected>
    }
])
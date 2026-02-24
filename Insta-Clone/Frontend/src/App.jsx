import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import "./features/shared/global.scss"
import "./features/shared/button.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx"

function App() {

  return (
    <AuthProvider>
    <RouterProvider router = {router} />
    </AuthProvider>
  )
}

export default App

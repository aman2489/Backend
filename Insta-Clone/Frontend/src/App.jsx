import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import "./style.scss"

function App() {

  return (
    <RouterProvider router = {router} />
  )
}

export default App

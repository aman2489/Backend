import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./shared/global.scss"
import "./shared/button.scss"
import { AuthProvider } from './features/auth/authContext'

function App() {
  

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App

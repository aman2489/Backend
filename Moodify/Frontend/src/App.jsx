import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import "./shared/global.scss"
import "./shared/button.scss"
import { AuthProvider } from './features/auth/authContext'
import { SongContextProvider } from './features/home/song.context'

function App() {
  

  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App

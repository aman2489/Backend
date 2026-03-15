import Navbar from "./components/Navbar"
import MainRoutes from "./routes/MainRoutes"


function App() {


  return (
    <div className="bg-gray-800 text-white font-thin h-screen py-10 px-[10%]">
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { axiosInstance } from './config/axiosInstance'
import AppRoutes from './routes/appRoutes'

function App() {

  return <AppRoutes/>
}

export default App

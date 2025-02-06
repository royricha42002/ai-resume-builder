import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import Navbar from './components/custom/navbar'
import { ResumeInfoProvider } from './context/ResumeInfoContext'

function App() {
  const [count, setCount] = useState(0)
  const {isLoaded,isSignedIn}=useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" />;
  }
  return (
    <>
    <ResumeInfoProvider>
      <Navbar/>
      <Outlet/>
      </ResumeInfoProvider>
    </>
  )
}

export default App

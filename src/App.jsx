import { useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/custom/Header'
// import { Toaster } from './components/ui/toaster'
  import { Toaster } from "@/components/ui/sonner"

function App() {
  const [count, setCount] = useState(0)
  const {user,isLoaded,isSignedIn}=useUser();


if(!isSignedIn && isLoaded){
 return <Navigate to={'/auth/sign-in'}/>
}

  return (
    <>
      <div>
      <Header/>
        <Outlet/>
        <Toaster/>
      </div>
    </>
  )
}

export default App

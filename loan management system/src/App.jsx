import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from '../supabaseclient'
import { useNavigate } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material';
import Header from './components/header';
import Sidebar from './components/Sidebar';
// import DashboardContent from './components/dashboard';



function App() {

  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  let session = localStorage.getItem("Session")


  useEffect(() => {
    if (!session) {
      navigate("/about")
      return
    }

  }, []);

  const logOut = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      navigate("/")
      localStorage.removeItem("Session")
    }
  }

 
  const [open, setOpen] = useState(true); 

  const toggleDrawer = () => {
    setOpen(!open);
  };





  return (
    <>
      {/* <div>
        <nav>
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
      <Box component="main" sx={{ flexGrow: 1, px: 3, pt: 2 }}>
        <DashboardContent />       
      </Box>
    </Box>
        </nav>
      </div> */}
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} />
    </>
  )
}

export default App





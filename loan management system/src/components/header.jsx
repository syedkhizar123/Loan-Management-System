import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase } from '../../supabaseclient';
import { useNavigate } from 'react-router-dom';




// const navigate = useNavigate()
// let session = localStorage.getItem("Session")


function Header({ open, toggleDrawer, handleLogout }) {

  const navigate = useNavigate()
  const logOut = async () => {
  
    let { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      navigate("/about")
      localStorage.removeItem("Session")
    }
    
  }

  return (
    <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: "rgb( 31 , 31 , 31 )" }}>
      <Toolbar>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>


        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          My Dashboard
        </Typography>


        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LogoutIcon sx={{ mr: 1, cursor: 'pointer' }} />
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;


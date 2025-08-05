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

    function Logout() {
        localStorage.removeItem("Admin")
        navigate("/About")
    }

    
  
    

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1  , backgroundColor: "rgb(31 , 31 , 31)"}}>
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
                    Admin Dashboard
                </Typography>


                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LogoutIcon onClick={Logout} sx={{ mr: 1, cursor: 'pointer' }} />
                    <Button color="inherit" onClick={Logout} >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;


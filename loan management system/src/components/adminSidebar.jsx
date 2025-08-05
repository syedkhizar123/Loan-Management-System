import { Link, useNavigate } from 'react-router-dom';
// import React from 'react';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { FaHome, FaChartPie, FaList, FaSignOutAlt } from 'react-icons/fa';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from '@mui/material';


// const drawerWidth = 240;
// const navItems = [
//   { text: 'Pending', icon: <AccessTimeIcon />, path: "/pending" },
//   { text: 'Approved', icon: <CheckCircleIcon />, path: "/approved" },
//   { text: 'Rejected', icon: <CancelIcon />, path: "/rejected" },
//   { text: 'Answered', icon: <ChatBubbleIcon />, path: "/answered" },
// ];

function Sidebar({ open }) {

      const navigate = useNavigate()

   function Logout() {
        localStorage.removeItem("Admin")
        navigate("/App")
    }

  return (


    // <Drawer
    //   variant="persistent"
    //   open={open}
    //   sx={{
    //     width: open ? drawerWidth : 0,
    //     flexShrink: 0,
    //     '& .MuiDrawer-paper': {
    //       width: drawerWidth,
    //       boxSizing: 'border-box',
    //       transition: 'width 0.3s',
    //       overflowX: 'hidden',
    //     },
    //   }}
    // >
    //   <Toolbar />

    //   <div>
    //     <List>
    //       {navItems.map((item) => {
    //         const isActive = location.pathname === item.path;

    //         return (
    //           <ListItem
    //             button
    //             key={item.text}
    //             component={Link}
    //             to={item.path}
    //             sx={{
    //               color: isActive ? '#1976d2' : 'black',
    //               fontWeight: isActive ? 'bolder' : 'normal',
    //               '&:hover': {
    //                 backgroundColor: '#f5f5f5',
    //               },
    //             }}
    //           >
    //             <ListItemIcon
    //               sx={{
    //                 color: isActive ? '#1976d2' : 'inherit',
    //                 minWidth: '35px',
    //               }}
    //             >
    //               {item.icon}
    //             </ListItemIcon>
    //             <ListItemText primary={item.text} />
    //           </ListItem>
    //         );
    //       })}
    //     </List>
    //   </div>
    // </Drawer>
    <>
      <style>
        {
          `
        .thin-sidebar{
          left: 20px;
          width: 50px;
        }
          @media (max-width: 576px) {
            .thin-sidebar{
              width: 30px;
              left: 7px;
            }
          }
        `
        }
      </style>

      <div className="thin-sidebar   mt-5" style={{
        position: "fixed",
        // left: "20px",
        borderRadius: "5px",
        // marginTop: "60px",
        top: "40px" ,
        bottom: "auto",
        // margin: "15px 0",
        // width: "50px",
        alignItems: "center",
        height: "85vh",
        backgroundColor: "#1f1f1f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        zIndex: "100", textAlign: "center"
      }}>
        <Link to="/pending">
          <div className="icon-wrapper"><FaHome title="Dashboard" /></div>
        </Link>
        <Link to="/approved">
          <div className="icon-wrapper"><FaChartPie title="Analytics" /></div>
        </Link>
        

        <div className="icon-wrapper"><FaSignOutAlt title="Logout" onClick={Logout} /></div>
      </div>
    </>
  );
}

export default Sidebar;

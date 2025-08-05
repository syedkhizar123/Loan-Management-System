// import { Link } from 'react-router';
// import React, { useState } from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import PostAddIcon from '@mui/icons-material/PostAdd';
import { FaHome, FaChartPie, FaList, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';



// const drawerWidth = 240;



// const navItems = [
//   { text: 'Dashboard', icon: <DashboardIcon />, path: "/App" },
//   { text: 'My Requests', icon: <AssignmentIcon />, path: "/loanRequest" },
//   { text: 'Request Loan', icon: <PostAddIcon />, path: "/form" },
//   { text: 'Admin Dashboard', icon: <DashboardIcon />, path: "/Admin" },
// ];

function Sidebar({ open }) {
  // const [selectedItem, setSelectedItem] = useState('Dashboard');

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

      <div className="thin-sidebar  mt-5 " style={{
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
        <Link to="/App" className="icon-wrapper" title="Dashboard">
          <DashboardIcon style={{ color: 'white' }} />
        </Link>

        <Link to="/loanRequest" className="icon-wrapper" title="My Requests">
          <AssignmentIcon style={{ color: 'white' }} />
        </Link>

        <Link to="/form" className="icon-wrapper" title="Request Loan">
          <PostAddIcon style={{ color: 'white' }} />
        </Link>

        {/* <Link to="/Admin" className="icon-wrapper" title="Admin Dashboard">
          <DashboardIcon style={{ color: 'white' }} />
        </Link> */}
      </div>
    </>
  );
}

export default Sidebar;








// export const Sidebar = () => {
//   return (
//     <>
//     </>
//   )
// }





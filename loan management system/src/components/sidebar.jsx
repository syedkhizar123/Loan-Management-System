// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import SettingsIcon from '@mui/icons-material/Settings';

// const drawerWidth = 240;

// function Sidebar({ open }) {
//   return (
//     <Drawer
//       variant="persistent"
//       open={open}
//       sx={{
//         width: open ? drawerWidth : 0,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           transition: 'width 0.3s',
//           overflowX: 'hidden',
//         },
//       }}
//     >
//       <Toolbar />
//       <List>
//       <ListItem button>
//           <ListItemIcon><SettingsIcon /></ListItemIcon>
//           <Link to="/App">
//           <ListItemText primary="Dashboard" />
//           </Link>
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon><SettingsIcon /></ListItemIcon>
//           <Link to="/loanRequest">
//           <ListItemText primary="Loan Request" />
//           </Link>
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon><SettingsIcon /></ListItemIcon>
//           <Link to="/loanRequest">
//           <ListItemText primary="Create Loan Request" />
//           </Link>
//         </ListItem>
//         <ListItem button>
//           <ListItemIcon><SettingsIcon /></ListItemIcon>
//           <Link to="/">
          
//           <ListItemText  primary="Log Out" />
//           </Link>
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// }

// export default Sidebar;








import {Link} from 'react-router';
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

 

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> , path:"/App"},
  { text: 'My Requests', icon: <AssignmentIcon /> , path: "/loanRequest" },
  { text: 'Request Loan', icon: <PostAddIcon /> , path: "/form" },
  // { text: 'Log Out', icon: <LogoutIcon /> },
];

function Sidebar({ open }) {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map((item , index) => {
          
          const isSelected = selectedItem === item.text;
          const color = isSelected ? '#1976d2' : 'black';

          return (
            <Link to={item.path} key={index}>
            <ListItem 
              button
              key={item.text}
              onClick={() => setSelectedItem(item.text)}
            >

  
              <ListItemIcon sx={{ color }}>
                {item.icon}
              </ListItemIcon>
             
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 'bold',
                  color,
                }}
              />
               
            </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;

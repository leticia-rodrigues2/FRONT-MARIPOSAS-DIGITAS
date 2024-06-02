import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { AccountCircle } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import s from "./style.module.css";

const drawerWidth = 240;
const pages = [
  { text: 'PÁGINA INICIAL', icon: <HomeIcon />, route: '/' },
  { text: 'ENTRAR', icon: <AccountCircle />, route: '/login' },
  { text: 'SOBRE', icon: <img src="images/borbo.png" alt="sobre" style={{ width: '25px' }} />, route: '/' },
  { text: 'CONTATO', icon: <ContactMailIcon />, route: '/' }
];

function HeaderLogoutMobile({ logoPrimary = false }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuItemClick = (route) => {
    navigate(route);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#80BBD9', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className='logo' style={{ textAlign: 'center', margin: 'auto' }}>
            {logoPrimary ? (
              <img src="images/logo-txt-img.png" style={{ width: '150px' }} />
            ) : (
              <img src="images/LogoText.png" style={{ width: '200px' }} />
            )}
          </div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)} sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: '100%', boxSizing: 'border-box' },
      }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ backgroundColor: '#80BBD9' }}>
            {pages.map((page, index) => (
              <ListItem key={index} disablePadding onClick={() => handleMenuItemClick(page.route)}>
                <ListItemButton sx={{ alignItems: 'center' }}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: 'white', fontWeight: "bold" }} primary={page.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HeaderLogoutMobile;

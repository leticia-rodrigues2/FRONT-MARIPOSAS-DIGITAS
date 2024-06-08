import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const pages = [
  { text: 'PÁGINA INICIAL', icon: <HomeIcon />, route: '/' },
  { text: 'PERFIL', icon: <CoPresentRoundedIcon />, route: '/profile' },
  { text: 'AJUDA', icon: <HelpOutlineOutlinedIcon />, route: '/' },
  { text: 'SAIR', icon: <LogoutOutlinedIcon />, route: '/' }
];

export default function HeaderMobile() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#80BBD9', boxShadow: 'none', minHeight: "12px !imaprtant" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div className='logo' style={{ textAlign: 'center', margin: 'auto' }}>
            <img src="images//LogoText.png" alt="Logo" className="logo" style={{ width: '150px' }} />
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
                  <ListItemText sx={{ color: 'white' }} primary={page.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

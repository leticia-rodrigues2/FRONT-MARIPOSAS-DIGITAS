import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ContentPasteSearchSharpIcon from '@mui/icons-material/ContentPasteSearchSharp';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './StyleNavBar.css';

const pages = [
    { text: 'PÁGINA INICIAL', icon: <HomeIcon /> },
    { text: 'CONFIGURAÇÕES', icon: <ContentPasteSearchSharpIcon /> },
    { text: 'AJUDA', icon: <HelpOutlineOutlinedIcon /> },
    { text: 'SAIR', icon: <LogoutOutlinedIcon /> }
];

function ResponsiveNavbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleOpenNavMenu = () => {
        setDrawerOpen(true);
    };

    const handleCloseNavMenu = () => {
        setDrawerOpen(false);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#80BBD9' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <img src="images//LogoText.png" alt="Logo" className="logo" style={{ width: '200px', alignItems: 'center' }} />
                    </Box>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <IconButton
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
                        
                        <div className='items'>
                            <List sx={{ backgroundColor: '#80BBD9', height: '200px', paddingTop: '15px', display: 'block' }}>
                                {pages.map((page, index) => (
                                    <ListItem key={index} disablePadding onClick={handleCloseNavMenu}>
                                        <ListItemIcon sx={{ color: 'white' }}>
                                            {page.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: 'white' }} primary={page.text} />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Drawer>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'block' } }}>
                        <IconButton
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveNavbar;

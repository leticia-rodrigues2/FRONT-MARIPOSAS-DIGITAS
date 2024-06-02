import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import "./style.module.css";
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';

function HeaderLogoutDesktop() {
 const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: '#80BBD9', margin:"0px" }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <div className='logo' style={{ textAlign: 'center', margin: 'auto' }}>
          <img src="images//logo-txt-img.png" alt="Logo" className="logo" style={{ width: '130px' }} />
        </div>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <Button
            onClick={() => { navigate('/login') }}
            sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px" }}
          >
            SOBRE
          </Button>

          <Button
            onClick={() => { navigate('/') }}
            sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px" }}
          >
            PERGUNTAS FREQUENTES
          </Button>

          <Button
            onClick={() => { navigate('/about') }}
            sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px" }}
          >
            CONTATO
          </Button>
        </Box>

        <Box
          onClick={() => navigate('/login')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)'
            }
          }}
        >
          <Typography sx={{ color: "#fff", marginRight: "4px", }} variant="body1">
            Entrar
          </Typography>
            <AccountCircle />
         
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  );
}
export default HeaderLogoutDesktop;
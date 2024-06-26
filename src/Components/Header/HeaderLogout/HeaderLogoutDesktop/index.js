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
import { HashLink } from 'react-router-hash-link';

function HeaderLogoutDesktop() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: '#80BBD9', margin: "0px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className='logo' style={{ textAlign: 'center', margin: 'auto' }}>
            <a href="/">
              <img src="images//logo-txt-img.png" alt="Logo" className="logo" style={{ width: '130px' }} />
            </a>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button
              onClick={() => { navigate('/about') }}
              sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px", fontSize: '12px' }}
            >
              SOBRE
            </Button>

            <HashLink to="/#section-faq" style={{ textDecoration: 'none' }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px", fontSize: '12px' }}
              >
                PERGUNTAS FREQUENTES
              </Button>
            </HashLink>

            <Button
              onClick={() => { navigate('/contact') }}
              sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', marginRight: "30px", fontSize: '12px' }}
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
            <Typography sx={{
              color: "#fff", marginRight: "4px", fontSize: '12px',
              textTransform: 'uppercase', fontWeight: 'bold', marginTop: '2px'
            }} variant="body1">
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
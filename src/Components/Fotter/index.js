import React from 'react';
import { Typography, Link } from '@mui/material';
import { Box, Container } from '@mui/material';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function Footer() {
  return (
    <Box component="footer" sx={{ width: '100%', bgcolor: '#D457D2', p: 1 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
          textAlign: 'center',
          gap: { xs: 2, md: 12 },
          height: '100%', // Definindo altura para o Container
        }}
      >
        <Box component="img"
          src="images/logo-txt-img.png"
          alt="logo-ct"
          sx={{ width: 200 }}
        />
        <Box component="ul"
          sx={{
            marginTop: '34px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            listStyle: 'none',
            gap: { xs: 2, md: 8 },
          }}
        >
          <Box component="li">
            <Typography gutterBottom variant="body2" component="div">
              <a href="/about" style={{ fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'none', fontSize: '12px' }}>SOBRE </a>
            </Typography>
          </Box>
          <Box component="li">
            <Typography gutterBottom variant="body2" component="div">
              <a href="/" style={{ fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'none', fontSize: '12px' }}>PERGUNTAS FREQUENTES</a>
            </Typography>
          </Box>
          <Box component="li">
            <Typography gutterBottom variant="body2" component="div">
              <a href="/contact" style={{ fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'none', fontSize: '12px' }}>CONTATO</a>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box>
              <Avatar sx={{ bgcolor: '#FFFFFF' }}>
                <WhatsAppIcon sx={{ color: '#D457D2' }} />
              </Avatar>
            </Box>
            <Box>
              <Avatar sx={{ bgcolor: '#FFFFFF' }}>
                <InstagramIcon sx={{ color: '#D457D2' }} />
              </Avatar>
            </Box>
          </Box>
        </Box>
      </Container>

      <Divider sx={{ my: 2, borderColor: '#FFFFFF', marginLeft: 2, marginRight: 4 }} />
      <Typography paddingBottom="4px" color="#FFFFFF" align="center" variant="body2">
        Copyright &copy; 2024 | Mariposas Digitais
      </Typography>
    </Box>
  );
}


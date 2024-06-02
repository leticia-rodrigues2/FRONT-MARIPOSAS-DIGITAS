import React from 'react';
import { Badge, Box, Container } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HandshakeIcon from '@mui/icons-material/Handshake';
import s from "./style.module.css";

export function SecondFooter() {
    const [invisible, setInvisible] = React.useState(false);

    const handleInitial = () => {
        console.log("Ícone de favorito clicado");
    };

    const handleNotification = () => {
        console.log("Notification");
        setInvisible(true);
    };

    const handleHandshake = () => {
        console.log("Mouse entrou no ícone");
    };

    return (
        <Box component="footer" sx={{ width: '100%', bgcolor: '#80BBD9' }}>
            <Container 
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'space-between' },
                    textAlign: 'center',
                    gap: { xs: 2, md: 12 },
                    height: '100%',
                }}
            >
                <Box 
                    className={s.icons}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 'auto'
                    }}
                >
                    <Box className={s.icon}>
                        <HomeSharpIcon 
                            className={`${s.likeIcon} ${s.clickable}`} 
                            onClick={handleInitial}
                        />
                    </Box>
                    <Box className={s.icon}>
                        <Badge 
                            color="secondary" 
                            variant="dot" 
                            invisible={invisible}
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '.MuiBadge-dot': {
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: '2px solid #80BBD9', // Cor de fundo do Box
                                }
                            }}
                        >
                            <NotificationsIcon 
                                className={`${s.likeIcon} ${s.clickable}`} 
                                onClick={handleNotification}
                            />
                        </Badge>
                    </Box>
                    <Box className={s.icon}>
                        <HandshakeIcon 
                            className={`${s.closeIcon} ${s.clickable}`} 
                            onMouseEnter={handleHandshake}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

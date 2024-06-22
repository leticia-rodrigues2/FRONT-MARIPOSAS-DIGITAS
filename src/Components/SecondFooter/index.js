import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Box, Container } from '@mui/material';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HandshakeIcon from '@mui/icons-material/Handshake';
import baseUrl from "../../config";
import s from "./style.module.css";

export function SecondFooter() {
    const [invisible, setInvisible] = React.useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/sponsorship/notification`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "email": email,
                        token: token,
                    },
                });
                console("FOOTEER", response)
                if (response.ok) {
                    console.log('FOOOOOI APADRINHADA');
                } else {
                    console.log('Credenciais inválidas.');
                }
            } catch (error) {
            }
        };

        fetchData();
    }, [email]);

    const handleInitial = () => {
        navigate("/dashboard");
    };

    const handleNotification = () => {
        setInvisible(true);
        navigate("/notification");
    };

    const handleHandshake = () => {
        navigate("/list-profile");
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
                            className={s.iconFooter}
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
                                '& .MuiBadge-dot': {
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: '2px solid #80BBD9',
                                }
                            }}
                        >
                            <NotificationsIcon
                                className={s.iconFooter}
                                onClick={handleNotification}
                            />
                        </Badge>
                    </Box>
                    <Box className={s.icon}>
                        <HandshakeIcon
                            className={s.iconFooter}
                            onClick={handleHandshake}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

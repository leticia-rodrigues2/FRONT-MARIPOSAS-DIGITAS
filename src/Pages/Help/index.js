import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import  Footer  from '../../Components/Fotter';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, CircularProgress, Alert, Snackbar, Checkbox } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import s from './style.module.css';
import baseUrl from "../../config.js";
import Container from '../../Components/Container';
import { SecondFooter } from "../../Components/SecondFooter";

const Help = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUserTypeChange = (userType) => {
        setFormData({
            ...formData,
            userType
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, userType, message } = formData;
        const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        console.log('Email enviado:', emailContent);

        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/contact/internal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, userType, message }),
            });

            if (response.ok) {
                console.log('Email enviado com sucesso!');
                setFormData({
                    name: '',
                    email: '',
                    userType: '',
                    message: ''
                });
                setOpenSnackbar(true);
            } else {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <div>
            <Header />
            <div className={s.container}>
                <Container>
                    <div sx={{ mb: '100px' }}>
                        <h2>ACONTECEU ALGO? SOLICITE AJUDA!</h2>
                        {showAlert && (
                            <Alert severity="error" style={{ marginBottom: '20px' }}>
                                Erro ao enviar mensagem. Tente novamente
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                sx={{ mb: '15px', mt: '15px' }}
                                id="name"
                                name="name"
                                type="text"
                                label="Insira seu nome completo"
                                variant="outlined"
                                size="small"
                                color="secondary"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{ mb: '10px' }}
                                id="email"
                                name="email"
                                type="email"
                                label="Insira seu e-mail"
                                variant="outlined"
                                size="small"
                                color="secondary"
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className={s.inputRow3}>
                                <Checkbox
                                    id="mentor"
                                    checked={formData.userType === "MENTORA"}
                                    color="secondary"
                                    onChange={() => handleUserTypeChange("MENTORA")}
                                />
                                <label htmlFor="mentor" className={`${s.checkboxLabel} ${s.customLabel}`}>Desejo ser madrinha</label>
                            </div>
                            <div className={s.inputRow4}>
                                <Checkbox
                                    id="mentee"
                                    checked={formData.userType === "AFILHADA"}
                                    color="secondary"
                                    onChange={() => handleUserTypeChange("AFILHADA")}
                                />
                                <label htmlFor="mentee" className={`${s.checkboxLabel} ${s.customLabel}`}>Desejo ser afilhada - receber apadrinhamento</label>
                            </div>
                            <Box sx={{ width: '100%', height: 200, marginTop: 2 }}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Digite sua mensagem"
                                    id="message"
                                    name="message"
                                    multiline
                                    rows={6}
                                    sx={{ height: '200px' }}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </Box>
                            <div className={s.buttonContainer}>
                                <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>ENVIAR</Button>
                            </div>
                        </form>
                    </div>
                </Container>

                <Snackbar open={openSnackbar} autoHideDuration={3500} onClose={handleCloseSnackbar}>
                <MuiAlert icon={false} elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="info">
                    Email enviado com sucesso! <img src="images/borbo.png" alt="nivel" className={s.nivelButterfly} />
                </MuiAlert>
            </Snackbar>
            </div>
            

            <SecondFooter />
        </div>
    );
};

export default Help;

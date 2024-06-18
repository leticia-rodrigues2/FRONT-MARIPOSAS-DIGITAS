import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import { Footer } from '../../Components/Fotter';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, CircularProgress, Alert, Snackbar } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';
import s from './style.module.css';
import baseUrl from "../../config.js"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = formData;
        const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        console.log('Email enviado:', emailContent);

        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, message }),
            });

            if (response.ok) {
                console.log('Email enviado com sucesso!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
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
                <div className={s.container2}>
                    <div sx={{ mb: '100px' }}>
                        <h2>DESEJA FALAR COM AS <b>MARIPOSAS FUNDADORAS</b>?</h2>
                        <p>Preencha o formulário abaixo ou entre contato através do e-mail <b>mariposasdigitais@gmail.com</b></p>
                        {showAlert && (
                            <Alert severity="error" style={{ marginBottom: '20px' }}>
                                Erro ao enviar mensagem. Tente novamente
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                sx={{ mb: '15px' }}
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
                                id="phone"
                                name="phone"
                                type="tel"
                                label="Insira seu telefone"
                                variant="outlined"
                                size="small"
                                color="secondary"
                                fullWidth
                                value={formData.phone}
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
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3500} onClose={handleCloseSnackbar}>
        <MuiAlert icon={false} elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="info">
        Email enviado com sucesso! <img src="images/borbo.png" alt="nivel" className={s.nivelButterfly} />
        </MuiAlert>
      </Snackbar>
            <Footer />
        </div>
    );
};

export default Contact;

import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import { Footer } from '../../Components/Fotter';
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, Button, Box } from '@mui/material'; 
import s from './style.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone:''
    });



    const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };


    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone ,message } = formData;
        const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        // Aqui você pode adicionar a lógica para enviar o email
        console.log('Email enviado:', emailContent);
        // Lógica de envio de email aqui...
    };

    return (
        <div>
        <Header />
        <div className={s.container}>
        <div className={s.container2}>
        <div sx={{ mb: '100px' }}>
              <h2>DESEJA FALAR COM AS <b>MARIPOSAS FUNDADORAS</b>?</h2>
              <p>Preencha o formulário abaixo ou entre contato através do e-mail <b>mariposasdigitais@gmail.com</b></p>
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{ mb: '15px' }}
                  id="name"
                  type="text"
                  label="Insira seu nome completo"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                />
                <TextField
                  sx={{ mb: '10px' }}
                  id="phone"
                  type="phone"
                  label="Insira seu telefone"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                  value={email}
                  onChange={handlePhoneChange}
                />
                 <TextField
                  sx={{ mb: '10px' }}
                  id="email"
                  type="email"
                  label="Insira seu e-mail"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                />
                <Box sx={{ width: '100%', height: 200, marginTop: 2 }}>
                  <TextField
                    color="secondary"
                    fullWidth
                    label="Digite sua mensagem"
                    id="message"
                    multiline
                    rows={6}
                    sx={{ height: '200px' }}
                  />
                </Box>
                <div className={s.buttonContainer}>
                  <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>ENVIAR</Button>
                </div>
              </form>
            </div>
        </div>
           
         
        </div>
        <Footer/>
      </div>
    );
};

export default Contact;

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container'
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader'
import { Button } from "@mui/material";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3120/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response === 200) {
        console.log('Login bem-sucedido!');
        navigate('/Home');
      } else {
        console.log('Credenciais inválidas.');
        // Mostrar mensagem de erro para o usuário
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Mostrar mensagem de erro para o usuário
    }
  };

  return (
    <div>
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <h2>REDEFINA SUA SENHA</h2>
            <form>
              <TextField
                sx={{ mb: '30px' }}
                id="password"
                type="password"
                label="Insira sua nova senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                sx={{ mb: '160px' }}
                id="confirm-password"
                label="Confirme sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </form>
          </div>
          <div className={s.buttonContainer}>
            <Button variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>Entrar</Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;

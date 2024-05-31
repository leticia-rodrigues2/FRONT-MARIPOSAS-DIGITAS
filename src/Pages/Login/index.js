import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container';
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader';
import { Button } from "@mui/material";

function Login() {
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
     
      if (response.ok) {
        console.log('Login bem-sucedido!');
        navigate('/Home'); 
      } else {
        console.log('Credenciais inválidas.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div sx={{mb: '100px' }}>
            <h2>SEJA BEM VINDA, MARIPOSA!</h2>
            <p>Nosso objetivo é apoiar e capacitar mulheres na área da tecnologia. É fantástico tê-la conosco!</p>
            <form onSubmit={handleSubmit}>
              <TextField 
                sx={{mb: '10px' }}
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
              <TextField 
                sx={{mb: '10px' }}
                id="password" 
                label="Insira sua senha" 
                variant="outlined" 
                size="small"
                color="secondary" 
                fullWidth 
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
              /> 
              <div className={s.forgotPassword}>
                <Link href="forgot" underline="none" color="secondary">
                Esqueci minha senha
                </Link>
              </div>
              <div className={s.buttonContainer}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>
                  Entrar
                </Button>
              </div>
            </form>
          </div>
        </Container>
        <div className={s['signup-link-fixed']}>
          <a href='cadastro' className="signup">Ainda não tem uma conta? <span className={s.rosa}>Clique aqui para se cadastrar!</span></a>
        </div>
      </div>
    </div>
  );
}

export default Login;

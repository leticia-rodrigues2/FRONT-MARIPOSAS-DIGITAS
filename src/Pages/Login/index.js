import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Container from '../../Components/Container';
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader';
import { Alert, AlertTitle, Button, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HeaderLogout from "../../Components/Header/HeaderLogout";
import HeaderLogoutMobile from "../../Components/Header/HeaderLogout/HeaderLogoutMobile";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
    setShowAlert(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
    setShowAlert(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      setShowAlert(true);
      return;
    }

    if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:3120/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        console.log('Login bem-sucedido!');
        navigate('/Home');
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setShowAlert(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <HeaderLogoutMobile />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <div className={s.title}>SEJA BEM VINDA, MARIPOSA!</div>
            <div className={s.text}>Nosso objetivo é apoiar e capacitar mulheres na área da tecnologia. É fantástico tê-la conosco!</div>
            {showAlert && (
              <Alert severity="error" sx={{ mb: '20px' }}>
                <AlertTitle>Error</AlertTitle>
                Credenciais inválidas. Tente novamente.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ mb: '20px' }}
                id="email"
                type="email"
                label="Insira seu e-mail"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                sx={{ mb: '10px' }}
                id="password"
                label="Insira sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
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
      </div>
      <div className={s['signup-link-fixed']}>
        <a href='cadastro' className="signup">Ainda não tem uma conta? <span className={s.rosa}>Clique aqui para se cadastrar!</span></a>
      </div>
    </div>
  );
}

export default Login;

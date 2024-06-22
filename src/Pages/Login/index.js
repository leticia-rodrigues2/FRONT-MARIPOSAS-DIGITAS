import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Container from '../../Components/Container';
import s from "./style.module.css";
import baseUrl from "../../config.js"
import { Alert, Button, IconButton, InputAdornment, Box, CircularProgress } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HeaderLogoutMobile from "../../Components/Header/HeaderLogout/HeaderLogoutMobile";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!validateEmail(emailValue)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
    setShowAlert(false);
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    if (passwordValue.length < 8) {
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
      setLoading(true);
      const response = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        setLoading(false)
        navigate("/dashboard");

      } else {
        setShowAlert(true);
        setLoading(false)
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setShowAlert(true);
      setLoading(false)
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
          <div style={{ marginBottom: '100px' }}> {/* Changed sx to style */}
            <div className={s.title}>SEJA BEM VINDA, MARIPOSA!</div>
            <div className={s.text}>Nosso objetivo é apoiar e capacitar mulheres na área da tecnologia. É fantástico tê-la conosco!</div>
            {showAlert && (
              <Alert severity="error" style={{ marginBottom: '20px' }}> {/* Changed sx to style */}
                Credenciais inválidas. Tente novamente.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ marginBottom: '20px' }} // Changed sx to style
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
                style={{ marginBottom: '10px' }} // Changed sx to style
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
        <a href='cadastro' className={s.signup}>Ainda não tem uma conta? <span className={s.rosa}>Clique aqui para se cadastrar!</span></a>
      </div>
    </div>
  );
}

export default Login;

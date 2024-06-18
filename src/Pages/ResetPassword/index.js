import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container';
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader';
import { Button, CircularProgress, Box, Alert, AlertTitle, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import baseUrl from "../../config";

function ResetPassword({ email: initialEmail }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setPasswordError('As senhas não coincidem.');
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);
      setPasswordError('');

      const response = await fetch(`${baseUrl}/user/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setShowAlert(false);
        navigate('/login');
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      setShowAlert(true);
      console.error('Erro ao redefinir senha:', error);
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
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <div className={s.title}>REDEFINA SUA SENHA</div>
            {showAlert && (
              <Alert severity="error" style={{ marginBottom: '20px' }}>
                <AlertTitle>Erro ao redefinir senha.</AlertTitle>
                Tente novamente.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ mb: '30px' }}
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
                sx={{ mb: '10px' }}
                id="password"
                label="Insira sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                sx={{ mb: '30px' }}
                id="confirm-password"
                label="Confirme sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
              <div className={s.buttonContainer}>
                <Button variant="contained" type="submit" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>Entrar</Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ResetPassword;

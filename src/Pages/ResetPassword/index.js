import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container';
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader';
import { Button, CircularProgress, Box, Alert , AlertTitle} from "@mui/material";

import baseUrl from "../../config";

function ResetPassword({ email }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); 

      const response = await fetch(`${baseUrl}/user/profile/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) { 
        setShowAlert(false)
        navigate('/login');
      } else {
        console.log('Erro ao redefinir senha:', response.statusText);
        setShowAlert(true)
      }
    } catch (error) {
      setShowAlert(true)
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
        <CircularProgress  color="secondary" />
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
                id="password"
                type="password"
                label="Insira sua nova senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
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

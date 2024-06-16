import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container';
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader';
import { Button, CircularProgress, Box, Modal, Backdrop, Fade, Typography } from "@mui/material";
import baseUrl from "../../config";

function ResetPassword({ email }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setSuccessOpen(true);
        setTimeout(() => {
          setSuccessOpen(false);
          navigate('/login');
        }, 500); 
      } else {
        setErrorMessage(response.statusText);
        setErrorOpen(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessOpen(false);
    setErrorOpen(false);
    navigate('/login');
  };

  return (
    <div>
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <div className={s.title}>REDEFINA SUA SENHA</div>
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

      <Modal
        open={successOpen || errorOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeOnClickOutside={true} // Fechar ao clicar fora do modal
      >
        <Fade in={successOpen || errorOpen}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
            <Box sx={{ bgcolor: 'background.paper', p: 4, maxWidth: 400, textAlign: 'center' }}>
              {successOpen && (
                <>
                  <Typography variant="h5" gutterBottom>Sucesso!</Typography>
                  <Typography variant="body1">Senha redefinida com sucesso!</Typography>
                </>
              )}
              {errorOpen && (
                <>
                  <Typography variant="h5" gutterBottom>Erro!</Typography>
                  <Typography variant="body1">Erro ao redefinir senha: {errorMessage}</Typography>
                </>
              )}
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ResetPassword;

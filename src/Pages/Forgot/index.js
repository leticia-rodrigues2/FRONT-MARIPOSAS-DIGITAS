import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container'
import s from "./style.module.css";
import { Button } from "@mui/material";
import HeaderLogoutMobile from "../../Components/Header/HeaderLogout/HeaderLogoutMobile";

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3120/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha: '' }),
      });

      if (response.ok) {
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
      <HeaderLogoutMobile />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <div className={s.title}>ESQUECEU SUA SENHA?</div>

            <div className={s.text}>Insira seu endereço de e-mail e receba o link para recuperá-la!</div>
            <form>
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
            </form>
          </div>
          <div className={s.buttonContainer}>
            <Button variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>ENVIAR</Button>
          </div>

        </Container>
      </div>
    </div>

  );
}

export default Forgot;

import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container'
import s from "./style.module.css";
import DefaultHeader from "../../Components/Header/DefaultHeader/DefaultHeader";
import { Button } from "@mui/material";

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
          <DefaultHeader />
          <div className={s.container}>
            <Container>
              <div sx={{mb: '100px' }}>
              <h2>ESQUECEU SUA SENHA?</h2>
              <p>Insira seu endereço de e-mail e receba o link para recuperá-la!</p>
              <form>
            <TextField 
              sx={{mb: '30px' }}
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
              <Button variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width:190 }}>ENVIAR</Button>
              </div>
              
            </Container>
          </div>
    </div>

  );
}

export default Forgot;

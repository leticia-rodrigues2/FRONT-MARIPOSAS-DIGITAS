import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container'
import s from "./style.module.css";
import { Button } from "@mui/material";
import Header from "../../Components/Header/Header";

function DeleteAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCancelClick = () => {
    navigate('/Home');
  };

  const handleDelete = async (event) => {
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
          <Header />
          <div className={s.container}>
            <Container>
              <div sx={{mb: '100px' }}>
              <h2>EXCLUIR CONTA</h2>
              <p> Por favor, esteja ciente de que a exclusão da sua conta é uma ação irreversível.<br />
        Uma vez confirmada, todos os seus dados serão permanentemente removidos do nosso sistema.<br /><br />
        Tem certeza de que deseja prosseguir?</p>
           
              </div>
              <div className={s.buttonContainer}>
              <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: '#D457D2', color: '#fff', width:190 }}>EXCLUIR CONTA</Button>
              </div>

              <div className={s.buttonContainer}>
              <Button variant="contained" onClick={handleCancelClick}  style={{ backgroundColor: '#80BBD9', color: '#fff', width:190 }}>CANCELAR</Button>
              </div>
              
            </Container>
          </div>
    </div>

  );
}

export default DeleteAccount;

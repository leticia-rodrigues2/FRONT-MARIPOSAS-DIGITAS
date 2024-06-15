import React from "react";
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container';
import s from "./style.module.css";
import { Button } from "@mui/material";
import Header from "../../Components/Header/Header";
import baseUrl from "../../config";

function DeleteAccount() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const handleCancelClick = () => {
    navigate('/dashboard');
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: 'DELETE',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'email': email,
          'token': token,
        },
      });
    
      if (response.ok) {
        console.log('Account successfully deleted!');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/');
      } else {
        console.error('Invalid credentials.');
    
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      // Show error message to the user
    }
  };

  return (
    <div>
      <Header />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <h2>EXCLUIR CONTA</h2>
            <p>
              Por favor, esteja ciente de que a exclusão da sua conta é uma ação irreversível.
              <br />
              Uma vez confirmada, todos os seus dados serão permanentemente removidos do nosso sistema.
              <br />
              <br />
              Tem certeza de que deseja prosseguir?
            </p>
          </div>
          <div className={s.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}
            >
              EXCLUIR CONTA
            </Button>
          </div>
          <div className={s.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleCancelClick}
              sx={{ backgroundColor: '#80BBD9', color: '#fff', width: 190 }}
            >
              CANCELAR
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default DeleteAccount;

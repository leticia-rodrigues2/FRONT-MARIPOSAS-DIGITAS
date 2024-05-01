import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Conteiner from "../../Components/Conteiner/Conteiner.js";
import Header from "../../Components/Header/Header.js"; 
import "./ResetPassword.css";

function ResetPassword() {
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
        // Mostrar mensagem de erro para o usuário
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Mostrar mensagem de erro para o usuário
    }
  };

  return (
    <>
      <Header /> {/* Adicione o componente Header */}
      <Conteiner
        titulo="REDEFINA SUA SENHA"
        paragrafo
        textoBotao="ALTERAR SENHA"
        textoLink
        link="/cadastro"
      >
      
       
        <div className="input-row">
          <TextField id="password" label="Insira sua nova senha" variant="outlined" defaultValue="Normal" size="small" color="secondary"  fullWidth={true} value={email} onChange={handleEmailChange} />
        </div>
        <div className="input-row">
          <TextField id="password" label="Confirme sua senha" variant="outlined" defaultValue="Normal" size="small"color="secondary" fullWidth={true} type="password" value={password} onChange={handlePasswordChange} /> {/* Definindo o tipo como 'password' */}
        </div>
      </Conteiner>
    </>
  );
}

export default ResetPassword;

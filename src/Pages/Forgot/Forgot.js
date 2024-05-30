import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Conteiner from "../../Components/Conteiner/Conteiner.js";
import "./style.module.css";

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
   
      <Conteiner
        titulo="ESQUECEU SUA SENHA?"
        paragrafo ="Insira seu endereço de e-mail e receba o link para recuperá-la!"
        textoBotao="ENVIAR"
        textoLink
        link
        useDefaultHeader={true}
      >
       
        <div className="input-row">
          <TextField id="email" label="Insira seu e-mail" variant="outlined" defaultValue="Normal" size="small" color="secondary"  fullWidth={true} value={email} onChange={handleEmailChange} />
        </div>
      </Conteiner>

  );
}

export default Forgot;

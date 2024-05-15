import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Conteiner from "../../Components/Conteiner/Conteiner.js";
import "./Help.css";

function Help() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [madrinha, setMadrinha] = useState(0);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleCheckboxChange = (event) => {
    setMadrinha(event.target.checked ? 1 : 0);
  }


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
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
 <Conteiner
      titulo="ACONTECEU ALGO? SOLICITE AJUDA!"
      paragrafo
      textoBotao="ENVIAR"
      textoLink
      link
    >

      <div className="input-row">
        <TextField id="password" label="Insira seu nome completo" variant="outlined" defaultValue="Normal" size="small" color="secondary" fullWidth={true} type="password" value={password} onChange={handlePasswordChange} /> {/* Definindo o tipo como 'password' */}
      </div>
      <div className="input-row">
        <TextField id="password" label="Insira seu e-mail" variant="outlined" defaultValue="Normal" size="small" color="secondary" fullWidth={true} value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-row3">
        <Checkbox id="madrinha" color="secondary" onChange={handleCheckboxChange} />
        <label htmlFor="madrinha" className="checkbox-label">Sou mentora</label>
      </div>
      <div className="input-row4">
        <Checkbox id="aluna" color="secondary" onChange={handleCheckboxChange} />
        <label htmlFor="aluna" className="checkbox-label">Sou mentorada</label>
      </div>

      <TextField
        id="outlined-multiline-static"
        label="Digite sua mensagem"
        color="secondary"
        multiline
        rows={4}
        defaultValue=""
        variant="outlined" />


    </Conteiner>

  );
}

export default Help;

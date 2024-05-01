import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Conteiner from "../../Components/Conteiner/Conteiner.js";
import "./login.css";

function Login() {
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
   <Conteiner
      titulo="SEJA BEM VINDA, MARIPOSA!"
      paragrafo="Nosso objetivo é apoiar e capacitar mulheres na área da tecnologia. É fantástico tê-la conosco!"
      textoBotao="ENTRAR"
      textoLink={<>
        Não tem uma conta?<span className="bold">Inscrever-se aqui!</span>
      </>}
      link="/cadastro"
    >


      <div className="input-row">
        <TextField id="username" label="Email" variant="outlined" defaultValue="Normal" size="small" color="secondary" fullWidth={true} value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-row">
        <TextField id="password" label="Senha" variant="outlined" defaultValue="Normal" size="small" color="secondary" fullWidth={true} type="password" value={password} onChange={handlePasswordChange} /> {/* Definindo o tipo como 'password' */}
      </div>

      <div className="signup-link2">
        <a href="#" className="signup2">Esqueci minha senha</a>
      </div>

    </Conteiner>
  );
}

export default Login;

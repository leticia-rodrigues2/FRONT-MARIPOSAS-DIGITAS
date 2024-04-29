import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom"; // Importando useNavigate
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
    <div className="login-container">
      <h2>Bem vinda!</h2>
      <p>Este site tem o intuito de ajudar mulheres na tecnologia. É ótimo te ver aqui!</p>
      <div className="input-row">
        <TextField id="username" label="Email" variant="standard" fullWidth={true} value={email} onChange={handleEmailChange} />
      </div>
      <div className="input-row">
        <TextField id="password" label="Senha" variant="standard" fullWidth={true} type="password" value={password} onChange={handlePasswordChange} /> {/* Definindo o tipo como 'password' */}
      </div>

      <div className="forgot-password">
        <Link href="#" color="inherit">
          Esqueceu a senha?
        </Link>
      </div>

      <div className="login-row">
        <button type="submit" onClick={handleSubmit}>Login</button>
      </div>

      <div className="signup-link">
        <a href="/cadastro" className="signup">Não tem uma conta? <strong>Inscrever-se aqui!</strong></a>
      </div>

    </div>
  );
}

export default Login;

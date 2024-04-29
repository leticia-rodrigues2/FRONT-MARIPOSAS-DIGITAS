import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import ErrorModal from '../ErrorModal/index.js';
import "./cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [madrinha, setMadrinha] = useState(0);
  const [response, setResponse] = useState(null);
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3120/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, telefone, senha, madrinha })
    })
    .then(response => {
      if (!response.ok) {
        setType("error");
        throw new Error('Erro ao cadastrar usuário');
        
      }
      setResponse("Usuário cadastrado com sucesso!");
      setType("success")
    })
    .catch(error => {
      setType("error");
      setResponse("Erro ao cadastrar usuário",error);
    });
  }

  const handleCheckboxChange = (event) => {
    setMadrinha(event.target.checked ? 1 : 0);
  }

  return (
    <div className="login-container">
      <h2>Cadastre-se !</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <TextField id="nome" label="Nome" variant="standard" fullWidth={true} value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="email" label="Email" variant="standard" fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="telefone" label="Telefone" variant="standard" fullWidth={true} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="senha" label="Senha" variant="standard" fullWidth={true} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="confirmar-senha" label="Confirmar Senha" variant="standard" fullWidth={true} type="password" />
        </div>
        <div className="input-row">
          <Checkbox id="madrinha" defaultChecked={madrinha === 1} color="secondary" onChange={handleCheckboxChange} />
          <label htmlFor="madrinha" className="checkbox-label">Desejo ser madrinha de mulheres na programação</label>
        </div>

        <div className="login-row">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      
       <ErrorModal message={response} type={type} onClose={() => setResponse(null)} />

      <div className="signup-link">
        <Link href="/" className="signup">Já tem uma conta? <strong>Faça login!</strong></Link>
      </div>
    </div>
  );
}

export default Cadastro;

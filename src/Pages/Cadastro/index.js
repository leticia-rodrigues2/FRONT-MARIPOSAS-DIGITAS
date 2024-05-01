import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import ErrorModal from '../../Components/ErrorModal/index.js';
import "./cadastro.css";

import Conteiner from "../../Components/Conteiner/Conteiner.js";

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
    <Conteiner
    titulo="CADASTRE-SE"
    paragrafo
    textoBotao="CADASTRAR"
    textoLink={
      <>
      Já possui uma conta? <span className="bold">Clique aqui para realizar o login!</span>
      </>
    }
    link="/cadastro"
  >
  
   
  <form onSubmit={handleSubmit}>

        <div className="input-row3">
          <Checkbox id="madrinha" defaultChecked={madrinha === 1} color="secondary" onChange={handleCheckboxChange} />
          <label htmlFor="madrinha" className="checkbox-label">Desejo ser mentora</label>
        </div>
        <div className="input-row3">
          <Checkbox id="aluna" defaultChecked={madrinha === 0} color="secondary" onChange={handleCheckboxChange} />
          <label htmlFor="aluna" className="checkbox-label">Desejo ser mentorada - receber apadrinhamento</label>
        </div>

        <div className="input-row">
          <TextField id="nome" label="Nome" variant="outlined" defaultValue="Normal" size="small" color="secondary"   fullWidth={true} value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="email" label="Email" variant="outlined" defaultValue="Normal" size="small" color="secondary"   fullWidth={true} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="telefone" label="Telefone" variant="outlined" defaultValue="Normal" size="small" color="secondary"   fullWidth={true} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="senha" label="Senha" variant="outlined" defaultValue="Normal" size="small" color="secondary"   fullWidth={true} type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div className="input-row">
          <TextField id="confirmar-senha" label="Confirmar Senha" variant="outlined" defaultValue="Normal" size="small" color="secondary"   fullWidth={true} type="password" />
        </div>
        

      <div className="signup-link-termos">
        Ao clicar em cadastrar, concordo que li e aceito os <span className="bold">Termos de Uso.</span>
      </div>
      </form>

  </Conteiner>
  );
}

export default Cadastro;

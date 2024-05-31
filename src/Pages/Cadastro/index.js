import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import s from "./style.module.css";
import Container from '../../Components/Container';
import DefaultHeader from "../../Components/Header/DefaultHeader/DefaultHeader";
import { Button } from "@mui/material";
import ScrollDialog from "./ScrollDialog";

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
        setResponse("Erro ao cadastrar usuário", error);
      });
  }

  const handleCheckboxChange = (event) => {
    setMadrinha(event.target.checked ? 1 : 0);
  }

  const handlePasswordChange = (event) => {
    setSenha(event.target.value);
  }

  return (
    <div>
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div sx={{ mb: '100px' }}>
            <h2>CADASTRE-SE</h2>
    
            <form onSubmit={handleSubmit}>

              <div className={s['input-row3']}>
                <Checkbox id="madrinha" defaultChecked={madrinha === 1} color="secondary" onChange={handleCheckboxChange} />
                <label htmlFor="madrinha" className="checkbox-label">Desejo ser mentora</label>
              </div>
              <div className={s['input-row4']}>
                <Checkbox id="aluna" defaultChecked={madrinha === 0} color="secondary" onChange={handleCheckboxChange} />
                <label htmlFor="aluna" className="checkbox-label">Desejo ser mentorada - receber apadrinhamento</label>
              </div>

              <TextField 
                sx={{ mb: '10px' }}
                id="nome" 
                type="text"
                label="Insira seu nome completo" 
                size="small" 
                color="secondary" 
                fullWidth 
                value={nome}
                onChange={(e) => setNome(e.target.value)} 
              />
              <TextField 
                sx={{ mb: '10px' }}
                id="email" 
                type="email"
                label="Insira seu e-mail" 
                variant="outlined" 
                size="small" 
                color="secondary" 
                fullWidth 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <TextField 
                sx={{ mb: '10px' }}
                id="phone" 
                type="text"
                label="Insira seu telefone" 
                variant="outlined" 
                size="small" 
                color="secondary" 
                fullWidth 
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)} 
              />
              <TextField 
                sx={{ mb: '10px' }}
                id="password" 
                label="Insira sua senha" 
                variant="outlined" 
                size="small"
                color="secondary" 
                fullWidth 
                type="password" 
                value={senha}
                onChange={handlePasswordChange} 
              /> 
              <TextField 
                sx={{ mb: '30px' }}
                id="confirm-password" 
                label="Confirme sua senha" 
                variant="outlined" 
                size="small"
                color="secondary" 
                fullWidth 
                type="password" 
                value={senha}
                onChange={handlePasswordChange} 
              /> 
              <div className={s.buttonContainer}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>CADASTRAR</Button>
              </div>
              <div className={s['signup-link-termos']}>
                Ao clicar em cadastrar, concordo que li e aceito os <span className="bold"><ScrollDialog  /></span>
              </div>
            </form>
          </div>     
         
        </Container>
        <div className={s['signup-link-fixed']}>
        <a href='login' className="signup">Já possui uma conta? <span className={s.rosa}>Clique aqui para realizar o login!</span></a>
      </div>
      </div>
    </div>
  );
}

export default Cadastro;

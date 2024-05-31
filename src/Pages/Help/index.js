import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import s from "./style.module.css";
import Container from '../../Components/Container';
import Header from "../../Components/Header/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

const Help = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMentorCheckboxChange = (event) => {
    setIsMentor(event.target.checked);
    if (event.target.checked) {
      setIsMentee(false);
    }
  };

  const handleMenteeCheckboxChange = (event) => {
    setIsMentee(event.target.checked);
    if (event.target.checked) {
      setIsMentor(false);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/Home');
  };
  return (
    <div>
    <Header />
    <div className={s.container}>
      <Container>
        <div sx={{ mb: '100px' }}>
          <h2>ACONTECEU ALGO? SOLICITE AJUDA!</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ mb: '15px' , mt:'15px'}}
              id="name"
              type="text"
              label="Insira seu nome completo"
              variant="outlined"
              size="small"
              color="secondary"
              fullWidth
              value={name}
              onChange={handleNameChange}
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
              onChange={handleEmailChange}
            />
           <div className={s.inputRow3}>
                <Checkbox id="mentor" checked={isMentor} color="secondary" onChange={handleMentorCheckboxChange} />
                <label htmlFor="mentor" className={`${s.checkboxLabel} ${s.customLabel}`}>Desejo ser mentora</label>
              </div>
              <div className={s.inputRow4}>
                <Checkbox id="mentee" checked={isMentee} color="secondary" onChange={handleMenteeCheckboxChange} />
                <label htmlFor="mentee" className={`${s.checkboxLabel} ${s.customLabel}`}>Desejo ser mentorada - receber apadrinhamento</label>
              </div>
            <Box sx={{ width: '100%', height: 200, marginTop: 2 }}>
              <TextField
                color="secondary"
                fullWidth
                label="Digite sua mensagem"
                id="message"
                multiline
                rows={6}
                sx={{ height: '200px' }}
              />
            </Box>
            <div className={s.buttonContainer}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>ENVIAR</Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  </div>
)};

export default Help;

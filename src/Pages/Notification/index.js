import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import Container from '../../Components/Container'
import s from "./style.module.css";
import DefaultHeader from '../../Components/Header/DefaultHeader/DefaultHeader'
import { Button } from "@mui/material";
import Header from "../../Components/Header/Header";
import { SecondFooter } from "../../Components/SecondFooter";
import StudentProfile from "../StudentProfile";

function Notification() {
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
        
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    
    }
  };

  return (
    <div>
      <Header />
      <div className={s.container}>
        <StudentProfile></StudentProfile>
      </div>
      <SecondFooter></SecondFooter>
    </div>
  );
}

export default Notification;

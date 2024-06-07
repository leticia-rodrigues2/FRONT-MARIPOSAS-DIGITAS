import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import ProfileNotification from "../ProfileNotification";
import { SecondFooter } from "../../Components/SecondFooter";
import s from "./style.module.css";

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
    <div className={s.container}>
      <Header />
      <div className={s.content}>
        <ProfileNotification />
      </div>
      <div className={s.footer}>
        <SecondFooter />
      </div>
    </div>
  );
}

export default Notification;

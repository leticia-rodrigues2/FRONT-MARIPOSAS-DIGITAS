import React, { useState } from "react";
import { TextField, Checkbox, Button, IconButton,Box, CircularProgress, } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import s from "./style.module.css";
import Container from '../../Components/Container';
import DefaultHeader from "../../Components/Header/DefaultHeader/DefaultHeader";
import ScrollDialog from "./ScrollDialog";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../config";

const Cadastro = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [phone, setPhone] = useState("");
  const [isMentor, setIsMentor] = useState(1);
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!event.target.value.trim() || !validateEmail(event.target.value)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
    setShowAlert(false);
  };

  if (loading) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <CircularProgress color="secondary" />
        </Box>
    );
}

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
    if (!name.trim() || name.length > 50 || !/^[a-zA-Z\s]*$/.test(name)) {
      setNomeError("Por favor, insira um nome válido.");
    } else {
      setNomeError('');
    }
  };

  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setPhone(phone);
    if (phone.trim() === "" || phone.length !== 11) {
      setPhoneError("Por favor, insira seu telefone.");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (!newPassword.trim()) {
      setPasswordError('Por favor, insira sua senha.');
    } else if (newPassword.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
    setShowAlert(false);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (!confirmPasswordValue.trim()) {
      setPasswordError('Por favor, confirme sua senha.');
    } else if (confirmPasswordValue !== password) {
      setPasswordError('As senhas não coincidem.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      setShowAlert(true);
      return;
    }

    if (!name.trim() || name.length > 50 || !/^[a-zA-Z\s]*$/.test(name)) {
      setNomeError("Por favor, insira um nome válido.");
      setShowAlert(true);
      return;
    }

    if (!password.trim()) {
      setPasswordError('Por favor, insira sua senha.');
      setShowAlert(true);
      return;
    } else if (password.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
      setShowAlert(true);
      return;
    }

    if (phone.trim() === "" || phone.length !== 11) {
      setPhoneError("Por favor, insira seu telefone.");
      setShowAlert(true);
      return;
    }
    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone, isMentor }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const respj = await response.json()
        const emailExists = respj._embedded.errors.some(({ message }) => message.search('User account already exists'));
        if (emailExists) setEmailError('Já existe esse email cadastrado')
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setShowAlert(true);
    } finally {
      setLoading(false)
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const mentorSelected = () => {
    setIsMentor(1)
  }

  const menteeSelected = () => {
    setIsMentor(2)
  }

  return (
    <div>
      <DefaultHeader />
      <div className={s.container}>
        <Container>
          <div>
            <div className={s.title}>CADASTRE-SE</div>
            <form onSubmit={handleSubmit}>
              <div className={s['input-row3']}>
                <Checkbox
                  id="madrinha"
                  checked={isMentor === 1}
                  color="secondary"
                  onChange={() => mentorSelected()}
                />
                <label htmlFor="madrinha" className="checkbox-label">Desejo ser madrinha</label>
              </div>
              <div className={s['input-row4']}>
                <Checkbox
                  id="aluna"
                  checked={isMentor === 2}
                  color="secondary"
                  onChange={() => menteeSelected()}
                />
                <label htmlFor="aluna" className="checkbox-label">Desejo ser afilhada - receber apadrinhamento</label>
              </div>

              <TextField
                sx={{ mb: '10px' }}
                id="nome"
                type="text"
                label="Insira seu nome completo"
                size="small"
                color="secondary"
                fullWidth
                value={name}
                onChange={handleNameChange}
                error={!!nomeError}
                helperText={nomeError}
              />
              <TextField
                sx={{ mb: '20px' }}
                id="email"
                type="email"
                label="Insira seu e-mail"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                sx={{ mb: '10px' }}
                id="phone"
                type="tel"
                label="Insira seu telefone"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                value={phone}
                error={!!phoneError}
                helperText={phoneError}
                onChange={handlePhoneChange}
              />
              <TextField
                sx={{ mb: '10px' }}
                id="password"
                label="Insira sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                sx={{ mb: '30px' }}
                id="confirm-password"
                label="Confirme sua senha"
                variant="outlined"
                size="small"
                color="secondary"
                fullWidth
                type={showPasswordConfirmation ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirmation}
                      edge="end"
                    >
                      {showPasswordConfirmation ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
              />
              <div className={s.buttonContainer}>
                <Button type="submit" variant="contained" style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}>CADASTRAR</Button>
              </div>
              <div className={s['signup-link-termos']}>
                Ao clicar em cadastrar, concordo que li e aceito os <span className="bold"><ScrollDialog /></span>
              </div>
            </form>
          </div>
        </Container>
      </div>
      <div className={s['signup-link-fixed']}>
        <a href='login' className="signup">Já possui uma conta? <span className={s.rosa}>Clique aqui para realizar o login!</span></a>
      </div>
    </div>
  );
}

export default Cadastro;

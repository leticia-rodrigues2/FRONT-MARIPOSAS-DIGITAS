import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import s from "./style.module.css";
import Container from '../../Components/Container';
import Header from "../../Components/Header/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import ImageUpload from "./Componets/ImageUpload";
import { SecondFooter } from "../../Components/SecondFooter";

const MentoredPerfil = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  const [menteeAmount, setMenteeAmount] = useState('1');
  const [training, setTraining] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMentorCheckboxChange = (event) => {
    setIsMentor(event.target.checked);
    if (event.target.checked) {
      setIsMentee(false);
      setMenteeAmount('1');
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

  const handleTrainingChange = (event) => {
    setTraining(event.target.value);
  };

  const handleMenteeAmountChange = (event) => {
    setMenteeAmount(event.target.value);
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
          <div className={s.content}>
            <div className={s.title}>CONFIGURE SEU PERFIL!</div>
            <form onSubmit={handleSubmit}>
              <div className={s.checkboxContainer}>
                <div className={s.inputRow}>
                  <Checkbox
                    id="mentor"
                    checked={isMentor}
                    color="secondary"
                    onChange={handleMentorCheckboxChange}
                    value="mentor"
                  />
                  <label htmlFor="mentor" className={`${s.checkboxLabel} ${s.customLabel}`}>
                    Desejo ser mentora
                  </label>
                </div>
                <div className={s.inputRow}>
                  <Checkbox
                    id="mentee"
                    checked={isMentee}
                    color="secondary"
                    onChange={handleMenteeCheckboxChange}
                    value="mentee"
                  />
                  <label htmlFor="mentee" className={`${s.checkboxLabel} ${s.customLabel}`}>
                    Desejo ser mentorada - receber apadrinhamento
                  </label>
                </div>
              </div>
              <Box sx={{ width: '100%', marginTop: 2 }}>
                <TextField
                  color="secondary"
                  fullWidth
                  label="Digite sua mensagem"
                  id="message"
                  multiline
                  rows={2}
                  sx={{ marginBottom: '15px' }}
                />
              </Box>
              <ImageUpload />
              <div>
                {isMentor && (
                  <>
                    <TextField
                      sx={{ marginBottom: '15px', marginTop: "15px" }}
                      id="training"
                      type="text"
                      label="Formação superior"
                      variant="outlined"
                      size="small"
                      color="secondary"
                      fullWidth
                      value={training}
                      onChange={(event) => setTraining(event.target.value)}
                    />
                    <div className={s.text}>Disponibilidade de apadrinhamento</div>
                    <div className={s.checkboxContainer}>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="oneMentee"
                          checked={menteeAmount === '1'}
                          color="secondary"
                          onChange={handleMenteeAmountChange}
                          value='1'
                        />
                        <label htmlFor="oneMentee" className={`${s.checkboxLabel} ${s.text}`}>
                          1 - UMA ÚNICA MENTORADA
                        </label>
                      </div>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="twoMentees"
                          checked={menteeAmount === '2'}
                          color="secondary"
                          onChange={handleMenteeAmountChange}
                          value='2'
                        />
                        <label htmlFor="twoMentees" className={`${s.checkboxLabel} ${s.text}`}>
                          2 - DUAS MENTORADAS
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                {isMentee && (
                  <>
                    <div className={s.text}>Classificação de conhecimento</div>
                    <div className={s.checkboxContainer}>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="initial"
                          checked={training === 'initial'}
                          color="secondary"
                          onChange={handleTrainingChange}
                          value='initial'
                        />
                        <label htmlFor="initial" className={`${s.checkboxLabel} ${s.text}`}>
                          1 - CASULO - PRIMEIRO CONTATO COM TECNOLOGIA
                        </label>
                      </div>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="intermediary"
                          checked={training === 'intermediary'}
                          color="secondary"
                          onChange={handleTrainingChange}
                          value='intermediary'
                        />
                        <label htmlFor="intermediary" className={`${s.checkboxLabel} ${s.text}`}>
                          2 - LAGARTA - ALGUM CONHECIMENTO SOBRE TECNOLOGIA
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={s.buttonContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#D457D2', color: '#fff', width: 190 }}
                >
                  ENVIAR
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </div>
      <SecondFooter />
    </div>
  );
};

export default MentoredPerfil;
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import s from "./style.module.css";
import Container from '../../Components/Container';
import Header from "../../Components/Header/Header";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { SecondFooter } from "../../Components/SecondFooter";
import ImageUpload from "./Componets/ImageUpload";
import baseUrl from "../../config";

const MentoredPerfil = () => {
  const [age, setAge] = useState('0');
  const [menteeLevel, setMenteeLevel] = useState('1');
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  const [mentoringCapacity, setMentoringCapacity] = useState('1');
  const [education, setEducation] = useState('');
  const [profile, setProfile] = useState('');
  const [image, setImage] = useState(null);
  const [isSponsored, setIsSponsored] = useState(false);
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const handleMentorCheckboxChange = (event) => {
    setIsMentor(event.target.checked);
    if (event.target.checked) {
      setIsMentee(false);
      setMentoringCapacity('1');
    }
  };

  const handleMenteeCheckboxChange = (event) => {
    setIsMentee(event.target.checked);
    if (event.target.checked) {
      setIsMentor(false);
    }
  };

  const handleMessageChange = (event) => {
    setProfile(event.target.value);
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  const convertImageToBytes = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (isMentor) {
        const mentorData = {
          email,
          education,
          age,
          mentoringCapacity,
          profile
        };
  
        const mentorResponse = await fetch(`${baseUrl}/user/profile/mentor`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'email': email,
            'token': token,
          },
          body: JSON.stringify(mentorData)
        });
  
        if (!mentorResponse.ok) {
          throw new Error('Failed to update mentor profile');
        }
      } else if (isMentee) {
        const menteeData = {
          email: "leticiaarodrigues2@gmail.com",
          age: "24",
          menteeLevel: 1,
          isSponsored: true,
          profile: "Olá, sou Leticia Rodrigues, iniciante na área de tecnologia e gostaria de encontrar uma mentora para me guiar nesta trilha."
        };
  
        const menteeResponse = await fetch(`${baseUrl}/user/profile/mentee`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'email': email,
            'token': token,
          },
          body: JSON.stringify(menteeData)
        });
  
        if (!menteeResponse.ok) {
          throw new Error('Failed to update mentee profile');
        }
      }
  
      if (image) {
        const imageBytes = await convertImageToBytes(image);
        const formData = new FormData();
        formData.append('arquivo', new Blob([imageBytes]));
  
        const imageResponse = await fetch(`${baseUrl}/user/profile/image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }
      }
  
      navigate("/dashboard");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
                  value={profile}
                  onChange={handleMessageChange}
                />
              </Box>
              <ImageUpload onImageChange={handleImageChange} />
              <div>
                {isMentor && (
                  <>
                    <TextField
                      sx={{ marginBottom: '15px', marginTop: "15px" }}
                      id="education"
                      type="text"
                      label="Formação superior"
                      variant="outlined"
                      size="small"
                      color="secondary"
                      fullWidth
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                    />
                    <div className={s.text}>Disponibilidade de apadrinhamento</div>
                    <div className={s.checkboxContainer}>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="oneMentee"
                          checked={mentoringCapacity === '1'}
                          color="secondary"
                          onChange={() => setMentoringCapacity('1')}
                          value='1'
                        />
                        <label htmlFor="oneMentee" className={`${s.checkboxLabel} ${s.text}`}>
                          1 - UMA ÚNICA MENTORADA
                        </label>
                      </div>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="twoMentees"
                          checked={mentoringCapacity === '2'}
                          color="secondary"
                          onChange={() => setMentoringCapacity('2')}
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
                          checked={menteeLevel === '1'}
                          color="secondary"
                          onChange={() => setMenteeLevel("1")}
                          value='initial'
                        />
                        <label htmlFor="initial" className={`${s.checkboxLabel} ${s.text}`}>
                          1 - CASULO - PRIMEIRO CONTATO COM TECNOLOGIA
                        </label>
                      </div>
                      <div className={s.inputRow}>
                        <Checkbox
                          id="intermediary"
                          checked={menteeLevel === '2'}
                          color="secondary"
                          onChange={() => setMenteeLevel("2")}
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

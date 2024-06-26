import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import s from "./style.module.css";
import Container from '../../Components/Container';
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Box , Alert, Button, IconButton, CircularProgress , AlertTitle} from "@mui/material"; 
import { SecondFooter } from "../../Components/SecondFooter";
import { styled } from '@mui/material/styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import CloseIcon from '@mui/icons-material/Close';
import baseUrl from "../../config";


const Input = styled('input')({
  display: 'none',
});

const ImagePreviewContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
  width: '150px',
  height: '100px',
  marginBottom: '12px',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '2px',
  right: '2px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  padding: '3px',
  zIndex: 1,
  '& svg': {
    fontSize: '16px',
  },
});

const MentoredPerfil = () => {
  const [age, setAge] = useState('0');
  const [menteeLevel, setMenteeLevel] = useState('1');
  const [loading, setLoading] = useState(false); 
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  const [mentoringCapacity, setMentoringCapacity] = useState('1');
  const [education, setEducation] = useState('');
  const [profile, setProfile] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
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
        <CircularProgress  color="secondary" />
      </Box>
    );
  }

  const handleMessageChange = (event) => {
    setProfile(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
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
    setLoading(true)
    event.preventDefault();

    try {
      if (isMentor) {
        const mentorData = {
          education,
          age,
          mentoringCapacity,
          profile
        };

        const mentorResponse = await fetch(`${baseUrl}/user/profile/mentor`, {
          method: 'POST',
          headers: {
            "token": token,
            'Content-Type': 'application/json',
            "email": email,
          },
          body: JSON.stringify(mentorData)
        });

        if (!mentorResponse.ok) {
          throw new Error('Failed to update mentor profile');
        }
      } else if (isMentee) {
        const menteeData = {
          age,
          menteeLevel,
          isSponsored,
          profile
        };

        const menteeResponse = await fetch(`${baseUrl}/user/profile/mentee`, {
          method: 'POST',
          headers: {
            "token": token,
            'Content-Type': 'application/json',
            "email": email

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
            "token":token,
            email
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
            {showAlert && (
              <Alert severity="error" style={{ marginBottom: '20px' }}> 
                <AlertTitle>Erro ao criar seu perfil.</AlertTitle>
                Tente novamente.
              </Alert>
            )}
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
                    Desejo ser madrinha
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
                    Desejo ser afilhada - receber apadrinhamento
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
              <div>
                <label htmlFor="upload-button">
                  <Input
                    accept="image/*"
                    id="upload-button"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button 
                    variant="contained" 
                    component="span" 
                    size="large" 
                    endIcon={<LocalSeeIcon />} 
                    style={{ backgroundColor: '#808080', color: '#fff', width: '100%', marginBottom: 12, justifyContent: 'space-between' }}
                  >
                    CARREGAR IMAGEM
                  </Button>
                </label>



                {preview && (
                  <ImagePreviewContainer>
                    <img src={preview} alt="Selected" style={{ width: "100%", height: "100%" }} />
                    <CloseButton onClick={handleRemoveImage}>
                      <CloseIcon />
                    </CloseButton>
                  </ImagePreviewContainer>
                )}
              </div>


              <TextField
                sx={{ my: '20px' }}
                id="age"
                type="text"
                label="Insira sua idade"
                size="small"
                color="secondary"
                fullWidth
                value={age}
                onChange={handleAgeChange}
        
              />
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
                          1 - UMA ÚNICA AFILHADA
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
                          2 - DUAS AFILHADAS
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import HeaderMobile from "../../Components/Header/HeaderMobile/HeaderMobile";
import { SecondFooter } from "../../Components/SecondFooter";
import s from "./style.module.css";
import ContainerPerfil from "../../Components/ContainerPerfil";
import { Button, Modal, Box } from "@mui/material";
import baseUrl from "../../config";
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import DeleteIcon from '@mui/icons-material/Delete';

const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ProfileClient() {
  const navigate = useNavigate();
  const { emailUser } = useParams();
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false); 

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleContact = (option) => {
    console.log(profile);
    if (option === 'whatsapp' && profile.phone) {
      window.open(`https://api.whatsapp.com/send?phone=${profile.phone}`);
    }
    if (option === 'email' && profile.email) {
      window.location.href = `mailto:${profile.email}`;
    }
    handleClose(); 
  };

  const fetchData = async () => {
    if (!emailUser) {
      console.log("emailUser is not defined");
      return;
    }

    console.log("Fetching data for emailUser:", emailUser);

    try {
      const response = await fetch(`${baseUrl}/user/profile`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "email": emailUser 
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.image) {
          const imageDataUrl = await convertBlobToImageDataUrl(
            new Blob([new Uint8Array(data.image)])
          );
          data.image = imageDataUrl;
          setImage(imageDataUrl);
        } else {
          console.log('No valid image data returned by the API:', data);
          setImage(null);
        }

        setProfile(data);
      } else {
        console.log('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (emailUser) {
      fetchData();
    }
  }, [emailUser]);

  const deleteUser = async() => {
    try {
      const response = await fetch(`${baseUrl}/sponsorship`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "emailMentee": emailUser,
          "emailMentor": email,
        },
      });

      if (response.ok) {
        console.log("Usuário deletado com sucesso");
        navigate('/dashboard');
      } else {
        console.log('Erro ao deletar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const { name, age, menteeLevel, degree, profile: description } = profile;
  const displayImage = image;

  return (
    <div className={s.pageContainer}>
      <HeaderMobile />
      <div className={s.container}>
        <div className={s.content}>
          <ContainerPerfil imageUrl={displayImage}>
            <div className={s.centeredContent}>
              <div className={s.title}>
                {name}, {age}
              </div>
              <div className={s.details}>
                {menteeLevel === 'CASULO' ? (
                  <>
                    <img src="/images/casulo.png" alt="nivel" className={s.nivel} />
                    <div className={s.text}>CASULO - PRIMEIRO CONTATO COM TECNOLOGIA</div>
                  </>
                ) : (
                  <>
                    <img src="/images/borbo.png" alt="nivel" className={s.nivelButterfly} />
                    <div className={s.text}>LAGARTA - ALGUM CONHECIMENTO SOBRE TECNOLOGIA</div>
                  </>
                )}
                <div className={s.text}>{degree}</div>
              </div>
              <div className={s.description}>
                <div className={s.text}>{description}</div>
                <div className={s.edit}>
                  <div className={s.iconWrapper}>
                    <PermPhoneMsgIcon className={s.icon} />
                  </div>
                  <Button
                    type="button" 
                    variant="contained"
                    onClick={handleOpen} // Abre o modal ao clicar no botão
                    className={s.editButton}
                  >
                    FALE COM A AFILHADA
                  </Button>
                </div>
                <Button onClick={deleteUser} className={s.deleteIcon} sx={{ color: '#fff' , marginTop:"40px" }} startIcon={<DeleteIcon sx={{ color: '#fff' }} />}>
                  DELETAR AFILHADA
                </Button>
              </div>
            </div>
          </ContainerPerfil>
        </div>
      </div>
      <div className={s.footer}>
        <SecondFooter />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="contact-modal-title">Opções de Contato</h2>

          <div className={s.buttonContainer}>
          <Button variant="contained" onClick={() => handleContact('whatsapp')}  className={s.pinkButton}>
            WhatsApp
          </Button>
          <Button variant="contained" onClick={() => handleContact('email')}  className={s.pinkButton}>
            Email
          </Button>
          </div>
          
          <div style={{width: '100%', marginTop: '20px', alignItems:"center"}}>
      <Button onClick={handleClose}>Fechar</Button>
    </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileClient;
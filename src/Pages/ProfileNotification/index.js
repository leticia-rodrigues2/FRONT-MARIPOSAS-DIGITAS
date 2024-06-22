import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import baseUrl from "../../config";
import ContainerPerfil from "../../Components/ContainerPerfil";

const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function ProfileNotification() {
  const [students, setStudents] = useState([]);
  const [firstTwoStudents, setFirstTwoStudents] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [visibleStudents, setVisibleStudents] = useState([]);
  const [showEmptyProfile, setShowEmptyProfile] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSubTitle, setMessageSubTitle] = useState('');

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    try {

      const response = await fetch(`${baseUrl}/user/profile`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "email": email,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();

      console.log("tetste1", data)

      if (data.menteeLevel === 'CASULO' || data.menteeLevel === 'LARGATA') {
        if (!data.isSponsored) {
          setShowEmptyProfile(true)
          setMessage('VOCÊ AINDA NÃO POSSUI UMA MADRINHA!');
          setMessageSubTitle('MARIPOSA, FIQUE TRANQUILA! EM BREVE VOCÊ ESTARÁ CONECTADA!');
        }

        const mentoringAvailable = data.mentoringAvailable;

        if (mentoringAvailable === 0) {
          setMessage('VOCÊ ATIGIU O LIMITE DE MARIPOSAS PARA APADRINHA');
          setShowEmptyProfile(true);

        }

      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }

    if (!showEmptyProfile) {
      console.log("caaaai")

      try {
        const response = await fetch(`${baseUrl}/sponsorship/mentee`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "token": token,
            "email": email,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados dos alunos');
        }

        let data = await response.json();

        if (Array.isArray(data)) {
          data = await Promise.all(data.map(async (s) => {
            const image = await convertBlobToImageDataUrl(new Blob([new Uint8Array(s.image)]));
            s.image = image;
            return s;
          }));

          setStudents(data);
          setFirstTwoStudents(data.slice(0, 2));
          setVisibleStudents(new Array(data.length).fill(true));
        } else {
          console.log('Dados retornados pela API não são um array:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos alunos:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const protectFirstTwoPositions = (arr) => {
    return [...firstTwoStudents, ...arr.slice(2)];
  };

  const handleFavorite = async (index) => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`${baseUrl}/sponsorship`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({
          emailMentee: students[index].email,
          emailMentor: email,
        })
      });

      if (response.ok) {
        const updatedStudents = [...students];
        setSnackbarMessage(`Agora contamos com você para cuidar da mariposa, ${updatedStudents[index].name}!`);
        setOpenSnackbar(true);
        updatedStudents.splice(index, 1);
        setStudents(protectFirstTwoPositions(updatedStudents));
        setVisibleStudents((prev) => prev.map((visible, i) => (i === index ? false : visible)));
        await fetchData();
      } else {
        console.error('Erro ao favoritar aluno:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao favoritar aluno:', error);
    }
  };

  const handleClose = (index) => {
    setVisibleStudents((prev) => prev.map((visible, i) => (i === index ? false : visible)));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (showEmptyProfile) {
    return (
      <ContainerPerfil imageUrl={null}>
        <div>
          <div className={styles.title}>
            {message}
          </div>
          <div className={styles.text}>
            {messageSubTitle}
          </div>
        </div>
      </ContainerPerfil>
    );
  }

  return (
    <>
      {students.map((student, index) => (
        visibleStudents[index] && (
          <div key={index} className={`${styles.wrapper} ${students.length > 1 ? styles['margin-60'] : ''}`}>
            <div className={styles['logo-container']}>
              <img
                src={student.image}
                alt="Logo"
                className={`${styles.logo} ${styles['round-image']}`}
              />
            </div>
            <div className={`${styles.container} ${students.length > 1 ? styles['margin-60'] : ''}`}>
              <div className={styles.contentLeft}>
                <div className={styles.title}>{student.name}, {student.age}</div>
                <div className={styles.details}>
                  {student.menteeLevel === 'CASULO' ? (
                    <>
                      <img src="images/casulo.png" alt="nivel" className={styles.nivel} />
                      <div className={styles.text}>{student.menteeLevel} - PRIMEIRO CONTATO COM TECNOLOGIA</div>
                    </>
                  ) : (
                    <>
                      <img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} />
                      <div className={styles.text}>{student.menteeLevel} - ALGUM CONHECIMENTO SOBRE TECNOLOGIA</div>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.contentRight}>
                <div className={styles.icons}>
                  <div
                    className={styles.icon}
                    onMouseEnter={() => setStudents(students.map((s, i) => i === index ? { ...s, isHovered: true } : s))}
                    onMouseLeave={() => setStudents(students.map((s, i) => i === index ? { ...s, isHovered: false } : s))}
                  >
                    {student.isHovered ? (
                      <FavoriteIcon className={`${styles.likeIcon} ${styles.clickable}`} onClick={() => handleFavorite(index)} />
                    ) : (
                      <FavoriteBorderOutlined className={`${styles.likeIcon} ${styles.clickable}`} onClick={() => handleFavorite(index)} />
                    )}
                  </div>
                  <div className={styles.icon}>
                    <CloseIcon className={`${styles.closeIcon} ${styles.clickable}`} onClick={() => handleClose(index)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ))}

      <Snackbar open={openSnackbar} autoHideDuration={3500} onClose={handleCloseSnackbar}>
        <MuiAlert icon={false} elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage} <img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} />
        </MuiAlert>
      </Snackbar>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import baseUrl from "../../config";

const convertBlobToImageDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error); // Handle error from blob conversion
    };
  });
};

export default function ProfileNotification() {
  const [students, setStudents] = useState([]);
  const [firstTwoStudents, setFirstTwoStudents] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');
  async function fetchData() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(`${baseUrl}/sponsorship/mentee?limit=2&page=1`, {
        method: 'GET',
        headers: {
          "token": token,
          "email": email
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
          data.data = await Promise.all(data.data.map(async (s) => {
            const image = await convertBlobToImageDataUrl(
              new Blob([new Uint8Array(s.image)])
            );
            s.image = image;
            return s;
          }));
          setStudents(data.data);
          setFirstTwoStudents(data.data.slice(0, 2));
        } else {
          console.log('Dados retornados pela API não são um array:', data);
        }
      } else {
        console.log('Erro ao buscar dados dos alunos:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar dados dos alunos:', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const protectFirstTwoPositions = (arr) => {
    return [...firstTwoStudents, ...arr.slice(2)];
  };

  const handleFavorite = async (index) => {
  
    try {
      const response = await fetch(`${baseUrl}/sponsorship`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({
          emailMentee: students[index].email, // Adjust as per your data structure
          emailMentor: email,
        })
      });
  
      if (response.ok) {
        const updatedStudents = [...students];
        setSnackbarMessage(`Agora contamos com você para cuidar da mariposa, ${updatedStudents[index].name}!`);
        setOpenSnackbar(true);
  
        setTimeout(() => {
          updatedStudents.splice(index, 1);
          setStudents(protectFirstTwoPositions(updatedStudents));
        }, 100);
        await fetchData();
      } else {
        console.error('Erro ao favoritar aluno:', response.statusText);
        // Handle error scenario if needed
      }
    } catch (error) {
      console.error('Erro ao favoritar aluno:', error);
      // Handle error scenario if needed
    }
  };
  
  const handleClose = async (index) => {
    try {
      const response = await fetch(`${baseUrl}/sponsorship`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "token": token,
          "emailMentee": students[index].email,
          "emailMentor": email,
        },
      });
  
      if (response.ok) {
        console("FOIIIIIIII")
      } else {
        console.error('Erro ao fechar patrocínio:', response.statusText);
        // Tratar cenário de erro se necessário
      }
    } catch (error) {
      console.error('Erro ao fechar patrocínio:', error);
      // Tratar cenário de erro se necessário
    }
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {students.map((student, index) => (
        <div key={index} className={`${styles.wrapper} ${students.length > 1 ? styles['margin-60'] : ''}`}>
          <div className={styles['logo-container']}>
            <img
              src={student.image}
              alt="Logo"
              className={`${styles.logo} ${styles['round-image']}`} />
          </div>
          <div className={`${styles.container} ${students.length > 1 ? styles['margin-60'] : ''}`} >
            <div className={styles.contentLeft}>
              <div className={styles.title}>{student.name}, {student.age}</div>
              <div className={styles.details}>
                {student.menteeLevel === 'CASULO' ? (
                  <><img src="images/casulo.png" alt="nivel" className={styles.nivel} /><div className={styles.text}>{student.level}  CASULO - PRIMEIRO CONTATO COM TECNOLOGIA</div></>
                ) : (
                  <><img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} /><div className={styles.text}>{student.level}  LAGARTA - ALGUM CONHECIMENTO SOBRE TECNOLOGIA</div></>
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
      ))}

      <Snackbar open={openSnackbar} autoHideDuration={3500} onClose={handleCloseSnackbar}>
        <MuiAlert icon={false} elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage} <img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} />
        </MuiAlert>
      </Snackbar>
    </>
  );
}

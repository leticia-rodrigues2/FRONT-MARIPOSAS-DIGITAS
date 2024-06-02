import React, { useState } from 'react';
import styles from './style.module.css';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const studentData = [
  {
    name: "Ana Carolina",
    age: 25,
    level: "Mariposa Mestra",
    degree: "Bacharel em Sistemas de Informação",
    imageUrl: "images/Ellipse.png",
    favorite: false,
    type: 'cocoon'
  },
  {
    name: "MARIA EUGÊNIA",
    age: 15,
    degree: "CASULO - PRIMEIRO CONTATO COM TECNOLOGIA",
    imageUrl: "images/Ellipse.png",
    favorite: false,
    type: 'cocoon'
  }
];

export default function StudentProfile() {
  const [students, setStudents] = useState(studentData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFavorite = (index) => {
    const updatedStudents = [...students];
    setSnackbarMessage(`Agora contamos com você para cuidar da mariposa, ${updatedStudents[index].name}!`);
    setOpenSnackbar(true);
    
    setTimeout(() => {
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    }, 100); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  return (
    <>
      {students.map((student, index) => (
        <div key={index} className={`${styles.wrapper} ${students.length > 1 ? styles['margin-60'] : ''}`}>
          <div className={styles['logo-container']}>
            <img src={student.imageUrl} alt="Logo" className={styles.logo} />
          </div>
          <div className={`${styles.container} ${students.length > 1 ? styles['margin-60'] : ''}`} >
            <div className={styles.contentLeft}>
              <div className={styles.title}>{student.name}, {student.age}</div>
              <div className={styles.details}>
                {student.type === 'cocoon' ? (
                  <img src="images/casulo.png" alt="nivel" className={styles.nivel} />
                ) : (
                  <img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} />
                )}
                <div className={styles.text}>{student.level}  {student.degree}</div>
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

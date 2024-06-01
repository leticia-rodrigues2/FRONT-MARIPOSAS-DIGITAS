import styles from './style.module.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined } from '@mui/icons-material';

const studentData = {
    name: "Ana Carolina",
    age: 25,
    level: "Mariposa Mestra",
    degree: "Bacharel em Sistemas de Informação",
    imageUrl: "images/Ellipse.png",
    favorite: false,
    type: 'cocoon'
};

export default function StudentProfile({ children }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(true);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper}>
          <div className={styles['logo-container']}>
            <img src={studentData.imageUrl} alt="Logo" className={styles.logo} /> 
          </div>
          <div className={styles.container}> 
            <div className={styles.contentLeft}> 
              <div className={styles.title}>{studentData.name}, {studentData.age}</div>
              <div className={styles.details}>
                {studentData.type === 'cocoon' ? (
                  <img src="images/casulo.png" alt="nivel" className={styles.nivel} />
                ) : (
                  <img src="images/borbo.png" alt="nivel" className={styles.nivelButterfly} />
                )}
                <div className={styles.text}>{studentData.level} - {studentData.degree}</div>
              </div>
            </div>

            <div className={styles.contentRight}> 
              <div className={styles.icons}> 
                <div 
                  className={styles.icon}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {isHovered ? (
                    <FavoriteIcon className={`${styles.likeIcon} ${styles.clickable}`} onClick={handleFavorite}/>
                  ) : (
                    <FavoriteBorderOutlined className={`${styles.likeIcon} ${styles.clickable}`} onClick={handleFavorite}/> 
                  )}
                </div>
                <div className={styles.icon}>
                  <CloseIcon className={`${styles.closeIcon} ${styles.clickable}`} onClick={handleClose} /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import styles from './style.module.css';

export default function ContainerPerfil({ children, imageUrl }) {
    const isInvalidImage = !imageUrl;
    console.log("cehgooooo",imageUrl);

    return (
        <div className={styles.wrapper}>
            <div className={styles['logo-container']}>
                <img 
                    src={isInvalidImage ? 'images/EllipseNull.png' : imageUrl} 
                    alt="Logo" 
                    className={`${styles.logo} ${styles['round-image']}`} 
                />
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

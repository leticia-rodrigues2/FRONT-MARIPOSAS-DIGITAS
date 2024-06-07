import React from 'react';
import styles from './style.module.css';

export default function ContainerPerfil({ children, imageUrl }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles['logo-container']}>
                <img src={imageUrl} alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

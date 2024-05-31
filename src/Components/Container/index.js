import styles from './style.module.css';

export default function Container({ children }) {
  return (
    <div className={styles.container}>
      <div>
          <div className={styles['logo-container']}>
              <img src="images/logo.png" alt="Logo" className={styles.logo} />
          </div>
          <div>
            {children}
          </div>
      </div>
    </div>
  );
}
import styles from './Loading.module.css';

export default function Loading(){
  return(
    <div className={styles.container}>
      <div className={styles.loading}>
      </div>
      <h2>Carregando os dados...</h2>
    </div>
  );
};
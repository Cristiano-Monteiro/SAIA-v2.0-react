import { useState, useEffect } from 'react';

import styles from './PaginaInicial.module.css';

import {
  WarningCircle,
} from '@phosphor-icons/react';

import LogoSAIA from '../../Static/imgs/centralizado-logo-saia-versao5-sigla+grafico+frase+fora.png';

export default function PaginaInicial(){
  // -- Variáveis/Funções de Home.tsx (José - Código antigo) --
  const [systemUpdate, setSystemUpdate] = useState([]);

  console.log(systemUpdate);

  /* Carrega a informação sobre a última atualização do sistema */
  useEffect(() => {
    fetch('http://152.67.42.101:4008/ultima_modificacao')
      .then(data => data.json())
      .then(data => setSystemUpdate(data));
  }, []);

  return(
    <div className='page'>
      <div className={styles.lastUpdate}>
        <figure>
          <WarningCircle size={30}/>
        </figure>
        <p>
          Última Atualização no Sistema:
          <span className={styles.data}>07/06/2023</span>
        </p>
      </div>
      <div className={styles.welcomeMessage}>
        <figure>
          <img src={LogoSAIA} alt="Logo do SAIA" />
        </figure>
        <h1>
          Boas vindas ao Sistema de Acompanhamento de Índices Acadêmicos.
        </h1>
      </div>
      <section className={styles.importantInformation}></section>
      <section className={styles.importantInformation}></section>
    </div>
  );
};
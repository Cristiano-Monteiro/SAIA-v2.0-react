import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

import LogoSAIA from '../../Static/imgs/centralizado-logo-saia-versao5-sigla+grafico+frase+fora.png';

export default function Login(){
  // ----------- Variáveis/Funções de login.tsx (José - Código antigo) -----------
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const [showPassword, setShowPassword] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  async function handleSubmit(e: any){
    e.preventDefault();
    try{
      const configFetch = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: body,
      };
      const response = await fetch('http://152.67.42.101:4008/login', configFetch);
      console.log(response);
      const respJSON = await response.json();

      console.log(respJSON);

      const token = respJSON.access_token;
      const permissoes = respJSON.permissoes;
      const username = respJSON.username;
      document.cookie = `permissoes=${permissoes};max-age=3600`;
      document.cookie = `username=${username};max-age=3600`;
      document.cookie = `token=${token};max-age=3600`;
      
      navigate('/');
    } catch(error){
      console.error(error);
      setInvalidLogin(true);
    };
  };

  console.log(invalidLogin);

  return(
    <div className={styles.container}>
      <figure className={styles.logoSaiaContainer}>
        <img src={LogoSAIA} alt="Logo do SAIA" />
      </figure>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginField}>
          <input 
            type="text"
            name="UserName"
            id="UserName"
            required 
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="UserName">Nome de Usuário</label>
        </div>
        <div className={styles.loginField}>
          <input 
            type="password"
            name="UserPassword"
            id="UserPassword"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="UserPassword">Senha</label>
        </div>
        {/* BUTTON: Alterar "type" para "submit" quando for necessário */}
        <button type="submit">
          enviar
        </button>
      </form>
    </div>
  );
};
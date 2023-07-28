import { 
  useContext,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { GlobalContextProvider } from '../../GlobalContext';

import styles from './Contato.module.css';

import { 
  PaperPlaneRight,
} from '@phosphor-icons/react';

import AlertMessage from '../../PagesSections/AlertMessage/AlertMessage';

export default function Contato(){
  const GlobalProps = useContext(GlobalContextProvider);

  // ------------------------FETCH-----------------------------
  const token = GlobalProps.getCookie('token');

  // ----------- Variáveis/Funções de FormularioContato.tsx (José - Código antigo) -----------
  //const [username, setUsername] = useState('');
  
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const body = new URLSearchParams();
  body.append("assunto", assunto);
  body.append("mensagem", mensagem);
  body.append('token', JSON.stringify(token));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const configFetch = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body),
      };
      const response = await fetch('http://152.67.42.101:4008/mensagem', configFetch);

      console.log(response);

      const respJSON = await response.json();
      const token = respJSON.data.access_token;
      const permissoes = respJSON.data.permissoes;
      const username = respJSON.data.username;
      
      document.cookie = `permissoes=${permissoes};max-age=3600`;
      document.cookie = `username=${username};max-age=3600`;
      document.cookie = `token=${token};max-age=3600`;

      body.append("username", respJSON.data.username);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  
  // ------ Variáveis usadas no componente "AlertMessage" -----
  const msg = 'Ainda não está em funcionamento! Em breve essa função será ativada.'
  const colorBg = 'var(--color-alert)';

  // New color: #f6e6e6;

  return(
    <div className='page'>
      <AlertMessage message={msg} colorBg={colorBg}/>
      <div className={styles.container}>
        <form className={styles.formField} id='contactForm' onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="assunto" 
            id="subjectInput" 
            placeholder='Assunto'
            required
            onChange={(e) => setAssunto(e.target.value)}
          />
          <textarea 
            name="mensagem" 
            id="textAreaInput" 
            placeholder='Mensagem'
            form='contactForm'
            required
            onChange={(e) => setMensagem(e.target.value)}
          ></textarea>
          {/* BUTTON: Alterar "type" para "submit" quando for necessário */}
          <button type="button">
            <PaperPlaneRight/>
            enviar
          </button>
        </form>
      </div>
    </div>
  );
};
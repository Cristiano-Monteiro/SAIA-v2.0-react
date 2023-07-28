import { useRef } from 'react';

import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

import { 
  House,
  Student,
  Exam,
  ChartLine,
  ChartBar,
  Database,
  Envelope,
} from '@phosphor-icons/react';

import LogoSAIA from '../../Static/imgs/centralizado-logo-saia-versao5-sigla+grafico+frase+fora.png';

export default function Navbar(){
  const navbarRef = useRef<HTMLElement>(null);
  const menuIcon = useRef<SVGSVGElement>(null);
  const navMobile = useRef<HTMLDivElement>(null);

  // Configurações para os ícones da Navbar
  
  //const iconColor = '#FFF';

  const iconColor = '#33A0B8';
  const iconSize = 30;

  // ShowNavbar: Mostra a navbar em dispositivos mobile
  function ShowNavbar(){
    if(navbarRef.current){
      navbarRef.current.classList.toggle('open');
    };
    if(menuIcon.current && navbarRef.current && navMobile.current){
      if(navbarRef.current.classList.contains('open')){
        menuIcon.current.style.fill = "#FFF";
        navMobile.current.style.backgroundColor = "transparent";
      } else {
        menuIcon.current.style.fill = iconColor;
        navMobile.current.style.backgroundColor = '#FFF';
      };
    };
  };

  return(
    <>
      <div className={styles.navMobile} ref={navMobile}>
        <div 
          className={styles.menu}
          onClick={()=>ShowNavbar()}
        >
          <svg width="30" height="20" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg" ref={menuIcon}>
            <g id="bars">
              <path id="bar1" d="M28 0H2C0.895431 0 0 0.895431 0 2C0 3.10457 0.89543 4 2 4H28C29.1046 4 30 3.10457 30 2C30 0.895431 29.1046 0 28 0Z" />
              <path id="bar2" d="M28 8H2C0.895431 8 0 8.89543 0 10C0 11.1046 0.89543 12 2 12H28C29.1046 12 30 11.1046 30 10C30 8.89543 29.1046 8 28 8Z" />
              <path id="bar3" d="M28 16H2C0.895431 16 0 16.8954 0 18C0 19.1046 0.89543 20 2 20H28C29.1046 20 30 19.1046 30 18C30 16.8954 29.1046 16 28 16Z"/>
            </g>
          </svg>
        </div>
        <figure>
          <img src={LogoSAIA} alt="Logo do SAIA" />
        </figure>
      </div>
      <nav 
        className={styles.navbar}
        ref={navbarRef}
      >
        <ul>
          <li className={styles.logo}>
            <NavLink to='/' className='logo'>
              <img src={LogoSAIA} alt="Logo do SAIA" />
            </NavLink>
          </li>
          <li>
            <NavLink to='/'>
              <span className={styles.icon}>
                <House size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Página Inicial</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/detalhes_alunos'>
              <span className={styles.icon}>
                <Student size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Detalhes de Alunos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/estatistica_disciplinas'>
              <span className={styles.icon}>
                <Exam size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Estatística de Disciplinas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/estatistica_siape'>
              <span className={styles.icon}>
                <ChartLine size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Estatística de SIAPE</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/demanda'>
              <span className={styles.icon}>
                <ChartBar size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Demanda</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/atualizar_dados'>
              <span className={styles.icon}>
                <Database size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Atualizar Dados</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/contato'>
              <span className={styles.icon}>
                <Envelope size={iconSize} color={iconColor} />
              </span>
              <span className={styles.text}>Contato</span>
            </NavLink>
          </li>
          <li className={styles.logout}>
            <NavLink to='/login'>
              <span className={styles.icon}>
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 27V3C0 1.34315 1.34315 0 3 0H13.25C14.2165 0 15 0.783502 15 1.75C15 2.7165 14.2165 3.5 13.25 3.5H3.5V27H13.5C14.3284 27 15 27.6716 15 28.5C15 29.3284 14.3284 30 13.5 30H3C1.34315 30 0 28.6569 0 27Z"/>
                  <path d="M23 17H12C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13H23L20.75 10.75C20.0596 10.0596 20.0596 8.94036 20.75 8.25C21.4404 7.55964 22.5596 7.55964 23.25 8.25L28.5858 13.5858C29.3668 14.3668 29.3668 15.6332 28.5858 16.4142L23.25 21.75C22.5596 22.4404 21.4404 22.4404 20.75 21.75C20.0596 21.0596 20.0596 19.9404 20.75 19.25L23 17Z"/>
                </svg>
              </span>
            </NavLink>
          </li>
          <span className={styles.saiaVersion}>
            SAIA v1.5
          </span>
        </ul>
      </nav>
    </>
  );
};
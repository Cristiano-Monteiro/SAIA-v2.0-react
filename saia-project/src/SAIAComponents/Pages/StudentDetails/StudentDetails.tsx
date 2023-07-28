import {
  useContext,
  useState,
} from 'react';

import styles from './StudentDetails.module.css';

import { GlobalContextProvider } from '../../GlobalContext';

import Loading from '../../PagesSections/Loading/Loading';

import GridComponent from '../../PagesSections/GridComponent/GridComponent';

export default function StudentDetails(){
  const [loading, setLoading] = useState(false);

  // -- Variáveis/Funções de Tabela.tsx (José - Código antigo) --

  // ---- FETCH ----
  const GlobalProps = useContext(GlobalContextProvider);

  const optionsFetch: {} = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

  // ---- Botões relacionados aos cursos ----
  const permissoes = GlobalProps.getCookie('permissoes');

  const [tableData, setTableData] = useState([]);

  const urlsFetchBttns = {
    SI: 'http://152.67.42.101:4008/dados/si_consolidado',
    CC: 'http://152.67.42.101:4008/dados/cc_consolidado',
    MAT_TARDE: 'http://152.67.42.101:4008/dados/matt_consolidado',
    MAT_MANHA: 'http://152.67.42.101:4008/dados/matm_consolidado',
    EST: 'http://152.67.42.101:4008/dados/estatistica_consolidado',
  };

  async function handleCourseButtons(url: string){
    const response = await fetch(url, optionsFetch);
    //console.log(response)

    setLoading(true);

    const data = await response.json();
    //console.log(data);

    setTableData(data);
    //console.log(permissoes);

    setLoading(false);
  };
  console.log(tableData[0]);

  const columnsGrid = [
    {
      name: 'MATRICULA',
      id: 'MATRICULA',
    },
    {
      name: 'NOME',
      id: 'NOME',
      width: '550px',
    },
    {
      name: 'STATUS',
      id: 'STATUS',
    },
    {
      name: 'CELULAR',
      id: 'CELULAR',
      width: '250px',
    },
    {
      name: 'EMAIL',
      id: 'EMAIL',
      width: '500px',
    },
    {
      name: 'BLOCO ATUAL',
      id: 'BLOCO_ATUAL',
    },
    {
      name: 'COMPONENTES FINALIZADOS',
      id: 'COMPONENTES_FINALIZADOS',
    },
    {
      name: 'COMPONENTES RESTANTES COM MATRICULA',
      id: 'COMPONENTES_RESTANTES_COM_MATRICULA',
    },
    {
      name: 'CARGA HORARIA RESTANTE',
      id: 'CARGA_HORARIA_RESTANTE',
    },
    
  ];

  /*
  const filterValue = [
    'MATRICULA',
    'NOME',
    'STATUS',
    'COMPONENTES_FINALIZADOS',
    'COMPONENTES_RESTANTES_PROVAVEIS',
    'BLOCO_ATUAL',
    'CARGA_HORARIA_RESTANTE',
  ];
  */

  return(
    <div className='page'>
      {/* Necessário teste com backend para arrumar os botões */}

      <div className={styles.SubjectOptions}>
        {permissoes.map((disciplina, i) => {
          if(disciplina == 'SI'){
            return (
              <button
                className={styles.bttn}
                type="button"
                onClick={() => handleCourseButtons(urlsFetchBttns.SI)}
                key={i}
              >
                Sistemas de Informação
              </button>
            )
          } else if(disciplina == 'CC'){
            return (
              <button
                className={styles.bttn}
                type="button"
                onClick={() => handleCourseButtons(urlsFetchBttns.CC)}
                key={i}
              >
                Ciências da Computação
              </button>
            )
          } else if(disciplina == 'MATT'){
            return (
              <button
                className={styles.bttn}
                type="button"
                onClick={() => handleCourseButtons(urlsFetchBttns.MAT_TARDE)}
                key={i}
              >
                Matemática (Tarde)
              </button>
            )
          } else if(disciplina == 'MATM'){
            return (
              <button
                className={styles.bttn}
                type="button"
                onClick={() => handleCourseButtons(urlsFetchBttns.MAT_MANHA)}
                key={i}
              >
                Matemática (Manhã)
              </button>
            )
          } else if(disciplina == 'ESTATISTICA'){
            return (
              <button
                className={styles.bttn}
                type="button"
                onClick={() => handleCourseButtons(urlsFetchBttns.EST)}
                key={i}
              >
                Estatística
              </button>
            )
          };
        })}
      </div>

      {loading ? (
        <Loading/>
      ) : (
        tableData.length === 0 ? (
          <h1>Escolha umas das opções para solicitar os dados</h1>
        ) : (
          <GridComponent
            dataGrid={tableData}  // dataGrid={tableData}
            columnsGrid={columnsGrid}  // columnsGrid={columnsGrid}
            paginationLimit={15}
          />
        )
      )}
    </div>
  );
};
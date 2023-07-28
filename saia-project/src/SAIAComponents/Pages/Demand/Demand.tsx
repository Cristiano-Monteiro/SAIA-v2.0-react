import {useContext, useState} from 'react';

import styles from './Demand.module.css';

import { GlobalContextProvider } from "../../GlobalContext";

import GridComponent from "../../PagesSections/GridComponent/GridComponent";
import ChartComponent from "../../PagesSections/ChartComponent/ChartComponent";

import Loading from '../../PagesSections/Loading/Loading';

/* USAR NO HIGHCHARTS:
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
*/

export default function Demand(){
  const [isLoading, setIsLoading] = useState(false);

  // -- Variáveis/Funções de Demanda.tsx (José - Código antigo) --
  const GlobalProps = useContext(GlobalContextProvider);
  
  const permissoes = GlobalProps.getCookie('permissoes');

  const optionsFetch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const [tableData, setTableData] = useState<any>([]);
  const [Categoriesgraph, setCategoriesgraph] = useState<string[]>([]);
  const [Categoriesgraph2, setCategoriesgraph2] = useState<string[]>([]);
  const [valuesgraph, setValuesgraph] = useState<{}>([]);
  const [valuesgraph2, setValuesgraph2] = useState<string[]>([]);

  const urlsFetchCourseDemand = {
    SI: {
      demanda: 'http://152.67.42.101:4008/dados/si_demanda',
      demanda_historica: 'http://152.67.42.101:4008/dados/si_demanda_historica',
    },
    CC: {
      demanda: 'http://152.67.42.101:4008/dados/cc_demanda',
      demanda_historica: 'http://152.67.42.101:4008/dados/cc_demanda_historica',
    },
    MAT_TARDE: {
      demanda: 'http://152.67.42.101:4008/dados/matt_demanda',
      demanda_historica: 'http://152.67.42.101:4008/dados/matt_demanda_historica',
    },
    MAT_MANHA: {
      demanda: 'http://152.67.42.101:4008/dados/matm_demanda',
      demanda_historica: 'http://152.67.42.101:4008/dados/matm_demanda_historica',
    },
    EST: {
      demanda: 'http://152.67.42.101:4008/dados/estatistica_demanda',
      demanda_historica: 'http://152.67.42.101:4008/dados/estatistica_demanda_historica',
    },
  };

  function handleCourseButtons(urlDemanda: string, urlDemandaHistorica: string){
    Promise.all([
      fetch(urlDemanda, optionsFetch),
      fetch(urlDemandaHistorica, optionsFetch),
    ])
      .then(([response1, response2]) => {
        setIsLoading(true);
        return Promise.all([response1.json(), response2.json()]);
      })
      .then(([data1, data2]) => {
        console.log('Data from first fetch:', data1);
        console.log('Data from second fetch:', data2);

        setTableData(data1);

        const categories: string[] = [];
        const quantidade: number[] = [];
        const reprovacoes: number[] = [];

        data1.forEach((item: any) => {
          categories.push(item.Disciplina);
          quantidade.push(item.Quantidade);
          reprovacoes.push(item.Reprovações);
        });

        const categoria_historico: string[] = extractDates(data2);
        const series_historico: string[] = transformData(data2);

        console.log(series_historico);

        setCategoriesgraph(categories);
        setValuesgraph2(series_historico);
        setCategoriesgraph2(categoria_historico);
        setValuesgraph([
          {
            type: 'bar',
            name: 'Pendencias',
            data: quantidade,
          },
          {
            type: 'bar',
            name: 'Reprovações',
            data: reprovacoes,
          },
        ]);

        setIsLoading(false);
      });
  };
  
  function extractDates(jsonData: any) {
    const dates: string[] = [];
    for (let i = 0; i < jsonData.length; i++) {
      const obj = jsonData[i];
      for (let key in obj) {
        if (key !== "Disciplina") {
          dates.push(key);
        };
      };
    };
    return dates;
  };

  function transformData(data: { [key: string]: any }[]) {
    const transformedData: any[] = [];
  
    // Loop through each object in the array
    data.forEach(item => {
      const keys = Object.keys(item);
      const name = item['Disciplina'];
      const values: number[] = [];
  
      // Loop through each key in the object, skipping the first key ('Disciplina')
      for (let i = 1; i < keys.length; i++) {
        values.push(item[keys[i]]);
      };
  
      // Add the transformed data to the array
      transformedData.push({
        type: 'line',
        name,
        data: values
      });
    });
  
    return transformedData;
  };

  /*
  const optionsHighcharts1 = {
    chart: {
      type: 'bar',
      height: 870,
      inverted: true
      },
    colors: ['#A7C7E7', '#FAA0A0'],
    title: {
      text: 'Demanda de Disciplinas Atual',
      align: 'left'
    },
    xAxis: {
      categories: Categoriesgraph,
      title: {
        text: 'Quantidade de discentes com demanda'
      },
      labels: {
        enabled: true
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' discentes'
    },
    plotOptions: {
      bar: {
        pointWidth: 5,
        dataLabels: {
          enabled: true,
          align: 'left',
          style: {
            fontSize: '9.98px' // set the font size of the data labels to 10 pixels
          }
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -20,
      y: 650,
      floating: true,
      borderWidth: 1,
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: valuesgraph,
  };

  const optionsHighcharts2 = {
    chart: {
      height: 870,
    },
    title: {
      text: 'Histórico de Demandas',
      align: 'left'
    },
    yAxis: {
      title: {
        text: 'Quantidade'
      }
    },
    xAxis: {
      categories: Categoriesgraph2,
    },
    legend: {
      layout: 'horizontal',
      verticalAlign: 'bottom'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: valuesgraph2,
  };
  */

  const columnsGrid = [
    {
      name: 'DISCIPLINA',
      id: 'Disciplina',
    },
    {
      name: 'DEMANDA',
      id: 'Quantidade',
    },
    {
      name: 'REPROVAÇÕES',
      id: 'Reprovações',
    },
  ];

  const colorsChart1 = ['#A7C7E7', '#FAA0A0'];

  return(
    <div className='page'>
      <div className={styles.SubjectOptions}>
        {permissoes.map((curso, index) => {
          if(curso === 'SI'){
            return(
                <button
                  className={styles.bttn}
                  key={index} 
                  type="button"
                  onClick={() => {
                    handleCourseButtons(
                      urlsFetchCourseDemand.SI.demanda,
                      urlsFetchCourseDemand.SI.demanda_historica,
                    )
                  }}
                >
                  Sistemas de Informação
                </button>
            ); 
          } else if(curso === 'CC'){
            return(
              <button
                className={styles.bttn}
                key={index}
                type="button"
                onClick={() => {
                  handleCourseButtons(
                    urlsFetchCourseDemand.CC.demanda,
                    urlsFetchCourseDemand.CC.demanda_historica,
                  )
                }}
              >
                Ciências da Computação
              </button>
            );
          } else if(curso === 'MATT'){
            return(
              <button
                className={styles.bttn}
                key={index}
                type="button"
                onClick={() => {
                  handleCourseButtons(
                    urlsFetchCourseDemand.MAT_TARDE.demanda,
                    urlsFetchCourseDemand.MAT_TARDE.demanda_historica,
                  )
                }}
              >
                Matemática (Tarde)
              </button>
            );
          } else if(curso === 'MATM'){
            return(
              <button
                className={styles.bttn}
                key={index} 
                type="button"
                onClick={() => {
                  handleCourseButtons(
                    urlsFetchCourseDemand.MAT_MANHA.demanda,
                    urlsFetchCourseDemand.MAT_MANHA.demanda_historica,
                  )
                }}
              >
                Matemática (Manhã)
              </button>
            );
          } else if(curso === 'ESTATISTICA'){
            return(
              <button
                className={styles.bttn}
                key={index}
                type="button"
                onClick={() => {
                  handleCourseButtons(
                    urlsFetchCourseDemand.EST.demanda,
                    urlsFetchCourseDemand.EST.demanda_historica,
                  )
                }}
              >
                Estatística
              </button>
            );
          };
        })}
      </div>

      {isLoading ? (
        <Loading/>
      ) : (
        <>
          {/* getRowId={(tableData: any) =>  tableData.Disciplina} */}
          <GridComponent
            dataGrid={tableData}
            columnsGrid={columnsGrid}
            paginationLimit={5}
          />

          <ChartComponent
            series={valuesgraph}
            categories={Categoriesgraph}
            color={colorsChart1}
            title='Demanda de Disciplinas Atual'
            height={2600}
          />

          <ChartComponent
            series={valuesgraph2}
            categories={Categoriesgraph2}
            title='Histórico de Demandas'
            height={1100}
          />
        </>
      )}
    </div>
  );
};
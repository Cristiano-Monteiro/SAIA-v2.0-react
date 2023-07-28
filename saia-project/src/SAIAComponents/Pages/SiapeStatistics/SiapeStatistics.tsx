import { GlobalContextProvider } from "../../GlobalContext";

import {
  useContext,
  useState,
} from 'react';

import styles from './SiapeStatistics.module.css';

import GridComponent from "../../PagesSections/GridComponent/GridComponent";

import ChartComponent from "../../PagesSections/ChartComponent/ChartComponent";

import Loading from "../../PagesSections/Loading/Loading";

export default function SiapeStatistics(){
  const [isLoading, setIsLoading] = useState(false);

  // -- Variáveis/Funções de Estatistica_siape.tsx (José - Código antigo) --
  const GlobalProps = useContext(GlobalContextProvider);

  const optionsFetch = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const permissoes = GlobalProps.getCookie('permissoes');

  const columnsGrid = [
    {
      name: 'SIAPE',
      id: 'SIAPE',
    },
    {
      name: 'REPROVADOS',
      id: 'REPROVADO',
    },
    {
      name: 'REGULAR',
      id: 'REGULAR',
    },
    {
      name: 'BOM',
      id: 'BOM',
    },
    {
      name: 'EXCELENTE',
      id: 'EXCELENTE',
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [valuesgraph, setValuesgraph] = useState<{name: string, data: number[]}[]>([]);
  const [valuesgraph2, setValuesgraph2] = useState<{name: string, data: number[]}[]>([]);
  const [siapeArray, setSiapeArray] = useState<string[]>([]);

  const [year, setYear] = useState('2022');

  const urlsFetchSiapeStatistics = {
    SI: 'http://152.67.42.101:4008/dados/si_estatisticasiape_',
    CC: 'http://152.67.42.101:4008/dados/cc_estatisticasiape_',
    MAT_TARDE: 'http://152.67.42.101:4008/dados/matt_estatisticasiape_',
    MAT_MANHA: 'http://152.67.42.101:4008/dados/matm_estatisticasiape_',
    EST: 'http://152.67.42.101:4008/dados/estatistica_estatisticasiape_',
  };

  async function handleCourseButtons(urlFetch: string){
    setIsLoading(true);

    const response = await fetch(urlFetch + year, optionsFetch);
    const data = await response.json();
    setTableData(data);

    const valuesgraph: { name: string; data: number[] }[] = [];
    const siapeArray: string[] = data.map((item: any) => item.SIAPE);
    const valuesgraph2: { name: string; data: number[] }[] = [];
  
    const categories = ['REPROVADO', 'REGULAR', 'BOM', 'EXCELENTE'];
    const categories2 = ['REPROVADO', 'SUCESSOS'];

    categories.forEach(category => {
      const categoryData = data.map((item: any) => item[category]);
      valuesgraph.push({
        name: category,
        data: categoryData
      });
    });

    categories2.forEach(category => {
      let categoryData: number[] = [];
    
      if (category === 'REPROVADO') {
        categoryData = data.map((item: any) => item[category]);
      } else {
        const regularData = data.map((item: any) => item['REGULAR']);
        const bomData = data.map((item: any) => item['BOM']);
        const excelenteData = data.map((item: any) => item['EXCELENTE']);
        
        for (let i = 0; i < regularData.length; i++) {
          const sum = regularData[i] + bomData[i] + excelenteData[i];
          categoryData.push(sum);
        };
      };
    
      valuesgraph2.push({
        name: category,
        data: categoryData,
      });
    });

    setValuesgraph(valuesgraph);
    setValuesgraph2(valuesgraph2);

    console.log(valuesgraph);

    setSiapeArray(siapeArray);

    setIsLoading(false);
  };

  function handleChangeYear(e: any){
    setYear(e.target.value);
  };

  const colorGraph1 = ['#ed5f5f', '#edc25f', '#5fcced', '#68ed5f'];
  const colorGraph2 = ['#ed5f5f', '#68ed5f'];

  /*
  const optionsHighcharts1 = {
    chart: {
      height:750,
      type: 'column',
      marginTop: 80 
    },
    title: {
      text: 'Estatisticas de SIAPE',
      align: 'left'
    },
    xAxis: {
      categories: siapeArray
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade Alunos'
      },
      stackLabels: {
        enabled: false
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      floating: true,
      x: 0,
      y: 30,
      borderWidth: 1,
      borderColor: '#CCC',
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: valuesgraph,
    colors: ['#ed5f5f', '#edc25f', '#5fcced', '#68ed5f'] // Specify the desired colors for the bars
  };

  const optionsHighcharts2 = {
    chart: {
      height: 750,
      type: 'column',
      marginTop: 80
    },
    title: {
      text: 'Sucesso e reprovação SIAPE',
      align: 'left'
    },
    xAxis: {
      categories: siapeArray
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Alunos'
      },
      stackLabels: {
        enabled: false
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      floating: true,
      x: 0,
      y: 30,
      borderWidth: 1,
      borderColor: '#CCC',
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'percent',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: valuesgraph2,
    colors: ['#ed5f5f', '#68ed5f'] // Specify the desired colors for the bars
  };
  */

  return(
    <div className='page'>
      <div className={styles.BoxSelectYear}>
        <label htmlFor="selectYear">Ano</label>
        <select name="selectYear" id="selectYear" onChange={handleChangeYear} required>
          <option value="2010">2010</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className={styles.SubjectOptions}>
        {permissoes.map((curso, index) => {
          if(curso == 'SI'){
            return <button key={index} className={styles.bttn} type="button" onClick={() => handleCourseButtons(urlsFetchSiapeStatistics.SI)}>Sistemas de Informação</button>
          } else if(curso == 'CC'){
            return <button key={index} className={styles.bttn} type="button" onClick={() => handleCourseButtons(urlsFetchSiapeStatistics.CC)}>Ciências da Computação</button>
          } else if(curso == 'MATT'){
            return <button key={index} className={styles.bttn} type="button" onClick={() => handleCourseButtons(urlsFetchSiapeStatistics.MAT_TARDE)}>Matemática (Tarde)</button>
          } else if(curso == 'MATM'){
            return <button key={index} className={styles.bttn} type="button" onClick={() => handleCourseButtons(urlsFetchSiapeStatistics.MAT_MANHA)}>Matemática (Manhã)</button>
          } else if(curso == 'ESTATISTICA'){
            return <button key={index} className={styles.bttn} type="button" onClick={() => handleCourseButtons(urlsFetchSiapeStatistics.EST)}>Estatística</button>
          };
        })}
      </div>

      {/*
        rows={tableData}
        getRowId={(tableData: any) =>  tableData.SIAPE} 
      */}

      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <GridComponent
            dataGrid={tableData}
            columnsGrid={columnsGrid}
            paginationLimit={5}
          />
          
          <ChartComponent
            series={valuesgraph}
            categories={siapeArray}
            color={colorGraph1}
          />

          <ChartComponent
            series={valuesgraph2}
            categories={siapeArray}
            color={colorGraph2}
          />
        </>
      )}
    </div>
  );
};
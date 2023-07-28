import {useState} from 'react';

import {
	ChartLine,
	ChartPie,
	ChartBar,
} from '@phosphor-icons/react';

import styles from './ChartComponent.module.css';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartComponentProps{
  series?: {},
  categories?: (string|any)[],
  color?: string[],
  title?: string,
  height?: number,
  inverted?: boolean,
}

export default function ChartComponent(props: ChartComponentProps){
  const [typeChart, setTypeChart] = useState('column');

  interface optionsInterface{
    chart: {},
    title: {},
    xAxis: {},
    plotOptions: {},
    series: {}|undefined,
    colors?: string[],
  };

  let options: optionsInterface = {
    chart: {
      type: typeChart,
      //width: 3000,
      height: props.height != undefined ? props.height : 550,
      inverted: props.inverted != undefined ? props.inverted : false,
    },
    title: {
      text: props.title,
    },
    xAxis: {
      categories: props.categories,
    },
    // Opção que permite os dados em uma única coluna (Chart showing stacked percentage columns):
    plotOptions: {
      column: {
        stacking: 'percent',
      },
      bar: {
        pointWidth: 15,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '1.3rem' // set the font size of the data labels to 10 pixels
          }
        }
      },
/*       series: {
        // pointWidth = define a largura da barra/coluna
        pointWidth: 1,
      }, */
    },
    series: props.series,
  };

  if(props.color != undefined){
    options.colors = props.color;
  };

  return(
    <section className={styles.container}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{className: `${styles.chartContainer}`}}
      />
      <div className={styles.typeChartChange}>
        <figure onClick={()=>setTypeChart('line')}>
            <ChartLine/>
        </figure>
        <figure onClick={()=>setTypeChart('pie')}>
            <ChartPie/>
        </figure>
        <figure onClick={()=>setTypeChart('column')}>
            <ChartBar/>
        </figure>
      </div>
    </section>
  );
};
import styles from './ImportantInformations.module.css';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { WarningCircle } from '@phosphor-icons/react';

export default function ImportantInformations(){
   const optionsChart = Highcharts.setOptions({
      chart: {
         backgroundColor: 'transparent',
      },
      title: {
         text: '',
      },
      colors: [
         '#ff7a91', 'green', '#5757fa', 'yellow'
      ],
      series: [{
         type: 'pie',
         data: [
            {
               name: 'ATIVOS',
               y: 50,
            },
            {
               name: 'PCD',
               y: 20,
            },
            {
               name: 'INDÍGENAS',
               y: 20,
            },
            {
               name: 'FORMANDO',
               y: 10,
            },
         ],
      }],
      plotOptions: {
         pie: {
            borderWidth: 0,
            cursor: 'pointer',
            allowPointSelect: true,
            dataLabels: {enabled: false},
            showInLegend: true,
         },
      },
   });

   return(
      <div className={styles.container}>
         <figure>
            <WarningCircle/>
         </figure>
         <div className={styles.ImportantInformationsBox}>
            <HighchartsReact
               highcharts={Highcharts}
               options={optionsChart}
               containerProps={{className: 'chart'}}
            />
         </div>
      </div>
   );
};
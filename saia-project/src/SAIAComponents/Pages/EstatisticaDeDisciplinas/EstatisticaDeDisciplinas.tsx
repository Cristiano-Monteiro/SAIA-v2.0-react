import {
   useContext,
   useState,
} from 'react';

import styles from './EstatisticaDeDisciplinas.module.css';

import { GlobalContextProvider } from '../../GlobalContext';

import GridComponent from '../../PagesSections/GridComponent/GridComponent';

import ChartComponent from '../../PagesSections/ChartComponent/ChartComponent';

import Loading from '../../PagesSections/Loading/Loading';

export default function EstatisticaDeDisciplinas(){
	const [loading, setLoading] = useState(false);

	// -- Variáveis/Funções de Estatistica_disciplinas.tsx (José - Código antigo) --
	const GlobalProps = useContext(GlobalContextProvider);

	const permissoes = GlobalProps.getCookie('permissoes');

	const optionsFetch = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const columnsGrid1 = [
		{
			name: 'DISCIPLINA',
			id: 'DISCIPLINA',
		},
		{
			name: 'REPROVADOS',
			id: 'REPROVADOS',
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

	const columnsGrid2 = [
		{
			name: 'DISCIPLINA',
			id: 'DISCIPLINA',
		},
		{
			name: '% DE SUCESSO',
			id: '%SUCESSO',
		},
		{
			name: '% DE REPROVADOS',
			id: '%REPROVACAO', 
		},
		{
			name: '% DE EXCELENTES',
			id: '%EXCELENTE',
		},
	];

	const [tableData, setTableData] = useState<any>([]);

	const [year, setYear] = useState('2022');

	const urlsFetchCourseStatistics = {
		SI: 'http://152.67.42.101:4008/dados/si_estatistica_',
		CC: 'http://152.67.42.101:4008/dados/cc_estatistica_',
		MAT_TARDE: 'http://152.67.42.101:4008/dados/matt_estatistica_',
		MAT_MANHA: 'http://152.67.42.101:4008/dados/matm_estatistica_',
		EST: 'http://152.67.42.101:4008/dados/estatistica_estatistica_',
	};

	async function handleCourseButtons(url: string){
		const response = await fetch(url + year, optionsFetch);
		//console.log(response);
		setLoading(true);

		const data = await response.json();

		setTableData(data);

		setTimeout(() => setLoading(false), 2000);
	};
	//console.log(tableData);

	function handleChangeYear(e: any) {
		setYear(e.target.value); 
	};

	// Tratando os dados para os gráficos
	const disciplinas: any = [];

  const arraySemNota: any = [];
  const arrayReprovados: any = [];
  const arrayRegular: any = [];
  const arrayBom: any = [];
  const arrayExcelente: any = [];

	const arraySucessoPorcem: any = [];
	const arrayReprovacaoPorcem: any = [];
	const arrayExcelentePorcem: any = [];

  tableData.forEach((data: any) => {
    disciplinas.push(data.DISCIPLINA);
    arraySemNota.push(data.SEM_NOTA);
    arrayReprovados.push(data.REPROVADOS);
    arrayRegular.push(data.REGULAR);
    arrayBom.push(data.BOM);
    arrayExcelente.push(data.EXCELENTE);

		arraySucessoPorcem.push(data['%SUCESSO']);
		arrayReprovacaoPorcem.push(data['%REPROVACAO']);

		arrayExcelentePorcem.push(data['%EXCELENTE']);

    //console.log(data);
  });

	const dadosNOTAS = [
    {
      name: 'SEM_NOTA',
      data: arraySemNota,
      color: '#959695',
    },
    {
      name: 'REPROVADOS',
      data: arrayReprovados,
      color: '#de425b',
    },
    {
      name: 'REGULAR',
      data: arrayRegular,
      color: '#e8894a',
    },
    {
      name: 'BOM',
      data: arrayBom,
      color: '#dbc667',
    },
    {
      name: 'EXCELENTE',
      data: arrayExcelente,
      color: '#79ab62',
    },
  ];

	const dadosSucessoReprovacao = [
		{
			name: '%SUCESSO',
			data: arraySucessoPorcem,
			color: '#4775d1',
		},
		{
			name: '%REPROVACAO',
			data: arrayReprovacaoPorcem,
			color: '#FF6961',
		},
	];

	const dadosSucessoExcelente = [
		{
			name: '%SUCESSO',
			data: arraySucessoPorcem,
			color: '#4775d1',
		},
		{
			name: '%EXCELENTE',
			data: arrayExcelentePorcem,
			color: '#79ab62',
		},
	];

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
				</select>
			</div>

			<div className={styles.SubjectOptions}>
				{permissoes.map((disciplina, index) => {
					if(disciplina == 'SI'){
						return(
							<button
								className={styles.bttn} 
								type="button"
								onClick={() => handleCourseButtons(urlsFetchCourseStatistics.SI)}
								key={index}
							>
								Sistemas de Informação
							</button>
						) 
					} else if(disciplina == 'CC'){
							return(
								<button
									className={styles.bttn}
									type="button"
									onClick={() => handleCourseButtons(urlsFetchCourseStatistics.CC)}
									key={index}
								>
									Ciências da Computação
								</button>	
							) 
					} else if(disciplina == 'MATT'){
							return(
								<button
									className={styles.bttn}
									type="button" 
									onClick={() => handleCourseButtons(urlsFetchCourseStatistics.MAT_TARDE)}
									key={index}
								>
									Matemática (Tarde)
								</button>
							) 
					} else if(disciplina == 'MATM'){
							return(
								<button
									className={styles.bttn}
									type="button" 
									onClick={() => handleCourseButtons(urlsFetchCourseStatistics.MAT_MANHA)}
									key={index}
								>
									Matemática (Manhã)
								</button>
							) 
					} else if(disciplina == 'ESTATISTICA'){
							return(
								<button
									className={styles.bttn} 
									type="button" 
									onClick={() => handleCourseButtons(urlsFetchCourseStatistics.EST)}
									key={index}
								>
									Estatística
								</button>
							);
					};
				})}
			</div>

			{loading ? (
				<Loading/>
			) : (
				<>
					{/* getRowId={(tableData: any) =>  tableData.DISCIPLINA} */}
					<GridComponent
						dataGrid={tableData}
						columnsGrid={columnsGrid1}
						paginationLimit={5}
					/>

					{/* SEM_NOTA: #959695 */}
					{/* REPROVADOS: #de425b */}
					{/* REGULAR: #e8894a */}
					{/* BOM: #dbc667 */}
					{/* EXCELENTE: #79ab62 */}
					<ChartComponent
						series={dadosNOTAS}
						categories={disciplinas}
						height={1100}
						inverted={true}
					/>

					{/* getRowId={(tableData: any) =>  tableData.DISCIPLINA} */}
					<GridComponent
						dataGrid={tableData}
						columnsGrid={columnsGrid2}
						paginationLimit={5}
					/>

					{/* COR DO GRÁFICO DE BARRA 2 (%SUCESSO): #4775d1 */}
					{/* COR DO GRÁFICO DE BARRA 2 (%REPROVACAO): #FF6961 */}
					<ChartComponent
						series={dadosSucessoReprovacao}
						categories={disciplinas}
					/>

					{/* COR DO GRÁFICO DE BARRA 1 (%SUCESSO): #4775d1 */}
					{/* COR DO GRÁFICO DE BARRA 1 (%EXCELENTE): #79ab62 */}
					<ChartComponent
						series={dadosSucessoExcelente}
						categories={disciplinas}
					/>
				</>
			)}
		</div>
	);
};
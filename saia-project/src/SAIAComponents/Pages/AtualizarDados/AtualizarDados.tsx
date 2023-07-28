import styles from './AtualizarDados.module.css';

import {
	useContext,
	useState,
} from 'react';

import { GlobalContextProvider } from '../../GlobalContext';

import { 
	CloudArrowUp,
	Database,
} from '@phosphor-icons/react';

export default function AtualizarDados(){
	// ----------------- FETCH -----------------
	const GlobalProps = useContext(GlobalContextProvider);

	const token = GlobalProps.getCookie('token');


	// -- Variáveis/Funções de Post-AttConsultaGeral.tsx e Post-AttNotasSemestrais.tsx (José - Código antigo) --
	const [resultConsultaGeral, setResultConsultaGeral] = useState('');
	const [resultNotasSemestrais, setResultNotasSemestrais] = useState('');

  function handleImageUploadConsultaGeral(e: any){
		e.preventDefault();
		const file = e.currentTarget['fileInputConsultaGeral'].files[0];
		const formData = new FormData();
		formData.append('file', file);
		formData.append('token', JSON.stringify(token));

		fetch('http://152.67.42.101:4008/update/consultageral', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(data => setResultConsultaGeral(data))
			.catch(error => console.log(error));
  };

	function handleImageUploadNotasSemestrais(e: any){
		e.preventDefault();
		const file = e.currentTarget['fileInputNotasSemestrais'].files[0];
		const formData = new FormData();
		formData.append('file', file);
		formData.append('token', JSON.stringify(token));

		fetch('http://152.67.42.101:4008/update/notassemestrais', {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(data => setResultNotasSemestrais(data))
			.catch(error => console.log(error));
	};

	console.log(resultConsultaGeral);
	console.log(resultNotasSemestrais);

	return(
		<div className='page'>
			<div className={styles.container}>
				<div className={styles.pageTitle}>
					<Database/>
					<h2>Escolha os dados para ser atualizado:</h2>
				</div>
				<div className={styles.uploadBox}>
					<span>Dados de consulta geral - SIGAA</span>
					<CloudArrowUp/>
				</div>
				<div className={styles.uploadBox}>
					<span>Notas Semestrais - SIGAA</span>
					<CloudArrowUp/>
				</div>


				<form onSubmit={handleImageUploadConsultaGeral}>
					<input type="file" id="fileInputConsultaGeral" />
					<input type="submit" value="Enviar" />
				</form>

				<form onSubmit={handleImageUploadNotasSemestrais}>
					<input type="file" id="fileInputNotasSemestrais" />
					<input type="submit" value="Enviar" />
				</form>
			</div>
		</div>
	);
};
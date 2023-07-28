import { createContext } from "react";

import DefaultLayout from "./DefaultLayout";

// GlobalContext(): Reúne todas as variáveis, funções e dados que serão usadas globalmente no projeto

function getCookie(name: string){
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(";").shift()?.split(",") ?? [];
	}
	return [];
};

function optionsFetch(content: any){
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(content),
	};
};

function teste(name: string){
	console.log(`ESTE é o ${name}`);
};

interface GlobalPropsInterface{
	getCookie: (name: string) => string[],
	optionsFetch: (content: any) => {},
	teste: (name: string) => void,
};

const GlobalProps: GlobalPropsInterface = {
	getCookie: getCookie,
	optionsFetch: optionsFetch,
	teste: teste,
};

export const GlobalContextProvider = createContext<GlobalPropsInterface>(GlobalProps);

export function GlobalContext(){
	return(
	<GlobalContextProvider.Provider value={GlobalProps}>
		<DefaultLayout/>
	</GlobalContextProvider.Provider>
	);
};
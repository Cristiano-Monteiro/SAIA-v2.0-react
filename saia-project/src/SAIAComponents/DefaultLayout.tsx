import { Outlet } from 'react-router-dom';

import './GlobalStyle.css';

import Navbar from './PagesSections/Navbar/Navbar';

import ImportantInformations from './PagesSections/ImportantInformations/ImportantInformations';

import Auth from './Auth';

// NAVBAR

// DefaultLayout(): Layout padrão da página
export default function DefaultLayout(){
   return(
      <>
         <Auth/>
         <Navbar/>
         <section className='MainContent'>
            <Outlet/>
         </section>
         <ImportantInformations/>
      </>
   );
};
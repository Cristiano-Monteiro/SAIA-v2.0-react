import { BrowserRouter, Routes, Route } from "react-router-dom";

import {GlobalContext} from "./GlobalContext";

import Login from "./Pages/Login/Login";

import PaginaInicial from "./Pages/PaginaInicial/PaginaInicial";

import StudentDetails from "./Pages/StudentDetails/StudentDetails";

import EstatisticaDeDisciplinas from "./Pages/EstatisticaDeDisciplinas/EstatisticaDeDisciplinas";

import SiapeStatistics from "./Pages/SiapeStatistics/SiapeStatistics";

import Demand from "./Pages/Demand/Demand";

import AtualizarDados from "./Pages/AtualizarDados/AtualizarDados";

import Contato from "./Pages/Contato/Contato";

// ProjectPagesRoutes(): Reúne todas as rotas existentes no projeto
export default function ProjectPagesRoutes(){
   return(
      <BrowserRouter basename="/SAIA-v2.0-react">
         <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<GlobalContext/>}>
               <Route path="/" element={<PaginaInicial/>}/>
               <Route path="/detalhes_alunos" element={<StudentDetails/>}/>
               <Route path="/estatistica_disciplinas" element={<EstatisticaDeDisciplinas/>}/>
               <Route path="/estatistica_siape" element={<SiapeStatistics/>}/>
               <Route path="/demanda" element={<Demand/>}/>
               <Route path="/atualizar_dados" element={<AtualizarDados/>}/>
               <Route path="/contato" element={<Contato/>}/>
            </Route>
         </Routes>
      </BrowserRouter>
   );
};
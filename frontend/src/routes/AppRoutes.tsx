import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";

import Cadastro from "../pages/Cadastro/Cadastro";

import Dashboard from "../pages/Dashboard/Dashboard";
import Tarefas from "../pages/Tarefas/Tarefas";
import Perfil from "../pages/Perfil/Perfil";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import EsqueciSenha from "../pages/EsqueciSenha/EsqueciSenha";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes(){

    return(

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/cadastro" element={<Cadastro />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/tarefas" element={<Tarefas />} />
                
                <Route path="/perfil" element={<Perfil />} />

                <Route path="/configuracoes" element={<Configuracoes />} />

                <Route path="/esqueci-senha" element={<EsqueciSenha />} />

                <Route path="/not-found" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}
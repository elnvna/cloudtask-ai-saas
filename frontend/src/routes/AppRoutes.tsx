import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";

import Cadastro from "../pages/Cadastro/Cadastro";

import Dashboard from "../pages/Dashboard/Dashboard";
import Tarefas from "../pages/Tarefas/Tarefas";

export default function AppRoutes(){

    return(

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/cadastro" element={<Cadastro />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/tarefas" element={<Tarefas />} />

            </Routes>

        </BrowserRouter>

    );

}
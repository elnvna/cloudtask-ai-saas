import api from "../api/api";

import type { Tarefa } from "../types/tarefa";

export interface CriarTarefaDTO {

    titulo: string;

    descricao: string;

    prioridade: "Baixa" | "Media" | "Alta";

}

export interface AtualizarTarefaDTO {

    titulo?: string;

    descricao?: string;

    prioridade?: "Baixa" | "Media" | "Alta";

    status?: "Pendente" | "Em andamento" | "Concluida";

}

export async function listarTarefas(): Promise<Tarefa[]> {

    const response = await api.get("/tarefas");

    return response.data;

}

export async function criarTarefa(
    dados: CriarTarefaDTO
): Promise<Tarefa> {

    const response = await api.post(
        "/tarefas",
        dados
    );

    return response.data;

}

export async function atualizarTarefa(

    id:number,

    dados:AtualizarTarefaDTO

):Promise<Tarefa>{

    const response = await api.put(

        `/tarefas/${id}`,

        dados

    );

    return response.data;

}

export async function excluirTarefa(id:number){

    await api.delete(`/tarefas/${id}`);

}
import api from "../api/api";
import type { Tarefa } from "../types/tarefa";

export async function listarTarefas(): Promise<Tarefa[]> {

    const token = localStorage.getItem("token");

    const response = await api.get("/tarefas", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
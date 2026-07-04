import { useEffect, useState } from "react";

import { listarTarefas } from "../services/tarefaService";

import type { Tarefa } from "../types/tarefa";

export function useDashboard() {

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {

        carregar();

    }, []);

    async function carregar() {

        const dados = await listarTarefas();

        setTarefas(dados);

    }

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        t => t.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        t => t.status === "Concluida"
    ).length;

    const emAndamento = tarefas.filter(
    t => t.status === "Em andamento"
    ).length;

    const produtividade = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    return {

        total,

        pendentes,

        emAndamento,

        concluidas,

        produtividade,

        tarefas

    };

}
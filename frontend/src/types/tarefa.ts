export type StatusTarefa =
    | "Pendente"
    | "Em andamento"
    | "Concluida";

export type PrioridadeTarefa =
    | "Baixa"
    | "Media"
    | "Alta";

export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: PrioridadeTarefa;
    status: StatusTarefa;
    usuario_id: number;
    data_criacao: string;
    data_conclusao?: string | null;
}
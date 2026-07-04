export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: "Baixa" | "Media" | "Alta";
    status: "Pendente" | "Em andamento" | "Concluida";
    usuario_id: number;
    data_criacao: string;
    data_conclusao?: string | null;
}
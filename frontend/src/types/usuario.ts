export interface UsuarioCreate {
    nome: string;
    email: string;
    senha: string;
}

export interface UsuarioResponse {
    id: number;
    nome: string;
    email: string;
}
import api from "../api/api";
import type { UsuarioCreate, UsuarioResponse } from "../types/usuario";

export async function criarUsuario(
    usuario: UsuarioCreate
): Promise<UsuarioResponse> {

    const response = await api.post<UsuarioResponse>(
        "/usuarios/",
        usuario
    );

    return response.data;
}

export interface Usuario {

    id: number;

    nome: string;

    email: string;

}

export async function obterPerfil() {

    const { data } = await api.get<Usuario>("/usuarios/me");

    return data;

}

export async function atualizarPerfil(

    usuario: {

        nome: string;

        email: string;

    }

) {

    const { data } = await api.put(

        "/usuarios/me",

        usuario

    );

    return data;

}

export async function alterarSenha(

    senhaAtual: string,

    novaSenha: string

) {

    const { data } = await api.put(

        "/usuarios/alterar-senha",

        {

            senha_atual: senhaAtual,

            nova_senha: novaSenha

        }

    );

    return data;

}
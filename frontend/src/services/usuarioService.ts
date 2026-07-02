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
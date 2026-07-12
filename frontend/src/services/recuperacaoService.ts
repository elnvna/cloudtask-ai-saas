import api from "../api/api";

export async function redefinirSenha(
    email: string,
    nova_senha: string
){

    const { data } = await api.post(
        "/recuperacao/redefinir",
        {
            email,
            nova_senha
        }
    );

    return data;

}
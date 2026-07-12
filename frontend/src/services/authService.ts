import api from "../api/api";

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export async function login(
    username: string,
    password: string
): Promise<LoginResponse> {

    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    const response = await api.post<LoginResponse>(
        "/auth/login",
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
}

export async function recuperarSenha(email: string) {

    const response = await api.post(
        "/auth/esqueci-senha",
        {
            email,
        }
    );

    return response.data;
}
import {
    Typography,
    TextField,
    Button
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Card
} from "./EsqueciSenha.styles";

import { recuperarSenha } from "../../services/authService";
import { useNotification } from "../../hooks/useNotification";

export default function EsqueciSenha() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);

    async function enviarEmail() {

        if (!email) {
            showNotification("Informe seu e-mail", "warning");
            return;
        }

        setLoading(true);

        try {

            await recuperarSenha(email);

            showNotification("Se existir uma conta para este e-mail, um link de recuperação foi enviado.", "success");

        } catch {

            showNotification("Erro ao solicitar recuperação.", "error");

        } finally {
            setLoading(false);
        }

    }

    return (

        <Container>

            <Card>

                <Typography
                    variant="h4"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                    Esqueci minha senha
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                >
                    Informe seu e-mail para receber um link de recuperação.
                </Typography>

                <TextField
                    label="E-mail"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                    variant="contained"
                    size="large"
                    onClick={enviarEmail}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar link'}
                </Button>

                <Button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Voltar ao login
                </Button>

            </Card>

        </Container>

    );

}
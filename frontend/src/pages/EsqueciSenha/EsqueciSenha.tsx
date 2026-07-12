import {
    Typography,
    TextField,
    Button
} from "@mui/material";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Container,
    Card
} from "./EsqueciSenha.styles";

import { recuperarSenha } from "../../services/authService";
import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";

export default function EsqueciSenha() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "warning" | "info"
    >("success");

    function mostrarMensagem(

        mensagem: string,

        tipo: "success" | "error" | "warning" | "info"

    ) {

        setSnackbarMessage(mensagem);

        setSnackbarSeverity(tipo);

        setSnackbarOpen(true);

    }

    async function enviarEmail() {

        try {

            await recuperarSenha(email);

            mostrarMensagem("Se existir uma conta para este e-mail, um link de recuperação foi enviado.", "success");

        } catch {

            mostrarMensagem("Erro ao solicitar recuperação.", "error");

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
                >
                    Enviar link
                </Button>

                <Button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Voltar ao login
                </Button>

            </Card>

            <AppSnackbar
            
                            open={snackbarOpen}
            
                            message={snackbarMessage}
            
                            severity={snackbarSeverity}
            
                            onClose={() => setSnackbarOpen(false)}
            
                        />

        </Container>

    );

}
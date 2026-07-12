import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";

import { Container, Card } from "./Cadastro.styles";
import { criarUsuario } from "../../services/usuarioService";
import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";

export default function Cadastro() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
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

    async function handleCadastro() {

        if (senha !== confirmarSenha) {

            mostrarMensagem(
                "As senhas não coincidem.", "error");

            return;
        }

        try {

            await criarUsuario({
                nome,
                email,
                senha,
            });

            mostrarMensagem(
                "Conta criada com sucesso!", "success");

            navigate("/");

        } catch (erro: any) {

            mostrarMensagem(
                erro?.response?.data?.detail ??
                "Erro ao cadastrar usuário.",   
                "error"
            );

        }

    }

    return (

        <Container>

            <Card elevation={8}>

                <Stack spacing={3}>

                    <Typography
                        variant="h4"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        Criar Conta
                    </Typography>

                    <TextField
                        label="Nome"
                        value={nome}
                        onChange={(e)=>setNome(e.target.value)}
                    />

                    <TextField
                        label="E-mail"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        value={senha}
                        onChange={(e)=>setSenha(e.target.value)}
                    />

                    <TextField
                        label="Confirmar senha"
                        type="password"
                        value={confirmarSenha}
                        onChange={(e)=>setConfirmarSenha(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={handleCadastro}
                    >
                        Criar Conta
                    </Button>

                </Stack>

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
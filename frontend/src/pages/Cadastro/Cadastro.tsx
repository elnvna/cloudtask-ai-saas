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
import { useNotification } from "../../hooks/useNotification";

export default function Cadastro() {

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleCadastro() {

        if (!nome || !email || !senha || !confirmarSenha) {
            showNotification("Preencha todos os campos", "warning");
            return;
        }

        if (senha !== confirmarSenha) {

            showNotification(
                "As senhas não coincidem.", "error");

            return;
        }

        setLoading(true);

        try {

            await criarUsuario({
                nome,
                email,
                senha,
            });

            showNotification(
                "Conta criada com sucesso!", "success");

            navigate("/");

        } catch (erro: any) {

            showNotification(
                erro?.response?.data?.detail ??
                "Erro ao cadastrar usuário.",   
                "error"
            );

        } finally {
            setLoading(false);
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
                        disabled={loading}
                    >
                        {loading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>

                </Stack>

            </Card>

        </Container>
        

    );

}
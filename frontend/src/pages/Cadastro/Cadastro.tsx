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

export default function Cadastro() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    async function handleCadastro() {

        if (senha !== confirmarSenha) {

            alert("As senhas não coincidem.");

            return;
        }

        try {

            await criarUsuario({
                nome,
                email,
                senha,
            });

            alert("Conta criada com sucesso!");

            navigate("/");

        } catch (erro: any) {

            alert(
                erro?.response?.data?.detail ??
                "Erro ao cadastrar usuário."
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

        </Container>

    );

}
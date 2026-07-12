import { useEffect, useState } from "react";

import {
    Avatar,
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";

import {
    Container,
    CardPerfil
} from "./Perfil.styles";

import {
    obterPerfil,
    atualizarPerfil,
    alterarSenha
} from "../../services/usuarioService";

import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";

export default function Perfil() {

    const [nome, setNome] = useState("");

    const [email, setEmail] = useState("");

    const [senhaAtual, setSenhaAtual] = useState("");

    const [novaSenha, setNovaSenha] = useState("");

    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error" | "warning" | "info"
    >("success");

    useEffect(() => {

        carregarPerfil();

    }, []);

    function mostrarMensagem(

        mensagem: string,

        tipo: "success" | "error" | "warning" | "info"

    ) {

        setSnackbarMessage(mensagem);

        setSnackbarSeverity(tipo);

        setSnackbarOpen(true);

    }

    async function carregarPerfil() {

        try {

            const usuario = await obterPerfil();

            setNome(usuario.nome);

            setEmail(usuario.email);

        } catch (error) {

            console.error(error);

        }

    }

    async function salvarPerfil() {

        try {

            await atualizarPerfil({

                nome,

                email

            });

            mostrarMensagem(

                "Perfil atualizado com sucesso!",

                "success"

            );

        } catch (error) {

            console.error(error);

            mostrarMensagem(

                "Erro ao atualizar perfil.",

                "error"

            );

        }

    }

    async function salvarSenha() {

        if (!senhaAtual || !novaSenha || !confirmarSenha) {

            mostrarMensagem(

                "Preencha todos os campos.",

                "warning"

            );

            return;

        }

        if (novaSenha !== confirmarSenha) {

            mostrarMensagem(

                "As senhas não conferem.",

                "warning"

            );

            return;

        }

        try {

            await alterarSenha(

                senhaAtual,

                novaSenha

            );

            mostrarMensagem(

                "Senha alterada com sucesso!",

                "success"

            );

            setSenhaAtual("");

            setNovaSenha("");

            setConfirmarSenha("");

        } catch (err: any) {

            console.error(err);

            mostrarMensagem(

                err.response?.data?.detail ||

                "Erro ao alterar senha.",

                "error"

            );

        }

    }

    return (

        <MainLayout>

            <Container>

                <CardPerfil>

                    <Stack
                        spacing={3}
                        sx={{
                            alignItems: "center",
                            mt: 1
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 90,
                                height: 90,
                                fontSize: 36,
                                bgcolor: "#1E3A8A"
                            }}

                        >
                            {nome
                                ? nome.charAt(0).toUpperCase()
                                : "?"}

                        </Avatar>

                        <TextField

                            label="Nome"

                            fullWidth

                            value={nome}

                            onChange={(e) =>

                                setNome(e.target.value)

                            }

                        />

                        <TextField

                            label="Email"

                            fullWidth

                            value={email}

                            onChange={(e) =>

                                setEmail(e.target.value)

                            }

                        />

                        <Button

                            variant="contained"

                            size="large"

                            onClick={salvarPerfil}

                        >

                            Salvar alterações

                        </Button>

                        <Typography

                            variant="h6"

                            sx={{
                                fontWeight: "bold",
                                mt: 5
                            }}

                        >

                            Redefinir Senha

                        </Typography>

                        <TextField

                            label="Senha atual"

                            type="password"

                            fullWidth

                            value={senhaAtual}

                            onChange={(e) =>

                                setSenhaAtual(e.target.value)

                            }

                        />

                        <TextField

                            label="Nova senha"

                            type="password"

                            fullWidth

                            value={novaSenha}

                            onChange={(e) =>

                                setNovaSenha(e.target.value)

                            }

                        />

                        <TextField

                            label="Confirmar senha"

                            type="password"

                            fullWidth

                            value={confirmarSenha}

                            onChange={(e) =>

                                setConfirmarSenha(e.target.value)

                            }

                        />

                        <Button

                            variant="outlined"

                            onClick={salvarSenha}

                        >

                            Alterar senha

                        </Button>

                    </Stack>

                </CardPerfil>

            </Container>

            <AppSnackbar

                open={snackbarOpen}

                message={snackbarMessage}

                severity={snackbarSeverity}

                onClose={() => setSnackbarOpen(false)}

            />

        </MainLayout>

    );

}
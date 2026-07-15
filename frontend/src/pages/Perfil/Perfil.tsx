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

import { useNotification } from "../../hooks/useNotification";

export default function Perfil() {

    const [nome, setNome] = useState("");

    const [email, setEmail] = useState("");

    const [senhaAtual, setSenhaAtual] = useState("");

    const [novaSenha, setNovaSenha] = useState("");

    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [loadingSalvar, setLoadingSalvar] = useState(false);

    const [loadingSenha, setLoadingSenha] = useState(false);

    const { showNotification } = useNotification();

    useEffect(() => {

        carregarPerfil();

    }, []);

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

        if (!nome || !email) {
            showNotification("Preencha todos os campos.", "warning");
            return;
        }

        setLoadingSalvar(true);

        try {

            await atualizarPerfil({

                nome,

                email

            });

            showNotification(

                "Perfil atualizado com sucesso!",

                "success"

            );

        } catch (error) {

            console.error(error);

            showNotification(

                "Erro ao atualizar perfil.",

                "error"

            );

        } finally {
            setLoadingSalvar(false);
        }

    }

    async function salvarSenha() {

        if (!senhaAtual || !novaSenha || !confirmarSenha) {

            showNotification(

                "Preencha todos os campos.",

                "warning"

            );

            return;

        }

        if (novaSenha !== confirmarSenha) {

            showNotification(

                "As senhas não conferem.",

                "warning"

            );

            return;

        }

        setLoadingSenha(true);

        try {

            await alterarSenha(

                senhaAtual,

                novaSenha

            );

            showNotification(

                "Senha alterada com sucesso!",

                "success"

            );

            setSenhaAtual("");

            setNovaSenha("");

            setConfirmarSenha("");

        } catch (err: any) {

            console.error(err);

            showNotification(

                err.response?.data?.detail ||

                "Erro ao alterar senha.",

                "error"

            );

        } finally {
            setLoadingSenha(false);
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

                            disabled={loadingSalvar}

                        >

                            {loadingSalvar ? 'Salvando...' : 'Salvar alterações'}

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

                            disabled={loadingSenha}

                        >

                            {loadingSenha ? 'Alterando...' : 'Alterar senha'}

                        </Button>

                    </Stack>

                </CardPerfil>

            </Container>

        </MainLayout>

    );

}
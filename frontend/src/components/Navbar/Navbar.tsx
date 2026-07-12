import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Box,
    IconButton,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";

import { obterPerfil } from "../../services/usuarioService";

interface Usuario {

    id: number;

    nome: string;

    email: string;

}

export default function Navbar() {

    const location = useLocation();

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {

        async function carregarUsuario() {

            try {

                const dados = await obterPerfil();

                setUsuario(dados);

            } catch (error) {

                console.error("Erro ao carregar usuário:", error);

            }

        }

        carregarUsuario();

    }, []);

    const titles: Record<string, string> = {

        "/dashboard": "Dashboard",

        "/tarefas": "Tarefas",

        "/perfil": "Perfil",

        "/configuracoes": "Configurações",

    };

    return (

        <AppBar
            position="static"
            color="inherit"
            elevation={1}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        color: "#64748B"
                    }}
                >

                    {titles[location.pathname] || "CloudTask AI"}

                </Typography>

                <Box

                    sx={{

                        display: "flex",

                        alignItems: "center",

                        gap: 2

                    }}

                >

                    <IconButton color="inherit">

                        {/* <NotificationsIcon /> */}

                    </IconButton>

                    <Avatar

                        sx={{

                            bgcolor: "#1E3A8A",

                            fontWeight: "bold",

                            cursor: "pointer"

                        }}

                    >

                        {usuario?.nome
                            ? usuario.nome.charAt(0).toUpperCase()
                            : ""}

                    </Avatar>

                </Box>

            </Toolbar>

        </AppBar>

    );

}
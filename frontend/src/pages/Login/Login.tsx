import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    Typography,
    TextField,
    Button,
    Stack,
    IconButton,
    InputAdornment,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import { Container, Card } from "./Login.styles";
import { AuthContext } from "../../contexts/AuthContext";
import { useNotification } from "../../hooks/useNotification";

export default function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const { showNotification } = useNotification();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [loading, setLoading] = useState(false);

    async function handleLogin() {

        if (!email || !password) {
            showNotification("Preencha todos os campos", "warning");
            return;
        }

        setLoading(true);

        try {

            await login(email, password);

            navigate("/dashboard");

        } catch {

            showNotification(
                "Usuário ou senha inválidos.", "error");

        } finally {
            setLoading(false);
        }

    }

    return (

        <Container>

            <Card elevation={8}>

                <Stack spacing={3}>

                    <Typography
                        variant="h3"
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                        CloudTask AI
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ textAlign: "center" }}
                    >
                        Bem-vindo de volta 👋
                    </Typography>

                    <TextField
                        label="E-mail"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type={mostrarSenha ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setMostrarSenha(!mostrarSenha)}
                                            edge="end"
                                        >
                                            {mostrarSenha ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                        disabled={loading}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <Typography 
                        sx={{ textAlign: "center" }}
                    >

                        Ainda não possui uma conta?{" "}

                        <Link to="/cadastro">
                            Cadastre-se
                        </Link>

                    </Typography>

                    <Typography
                        align="right"
                        sx={{
                            mt:1
                        }}
                    >
                        Esqueceu sua senha?{" "}

                        <Link to="/esqueci-senha">
                            Clique aqui
                        </Link>

                    </Typography>

                </Stack>

            </Card>
        </Container>

    );

}
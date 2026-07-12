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
import AppSnackbar from "../../components/AppSnackbar/AppSnackbar";

export default function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);

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

    async function handleLogin() {

        try {

            await login(email, password);

            navigate("/dashboard");

        } catch {

            mostrarMensagem(
                "Usuário ou senha inválidos.", "error");

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
                    >
                        Entrar
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
            <AppSnackbar
            
                            open={snackbarOpen}
            
                            message={snackbarMessage}
            
                            severity={snackbarSeverity}
            
                            onClose={() => setSnackbarOpen(false)}
            
                        />
        </Container>

    );

}
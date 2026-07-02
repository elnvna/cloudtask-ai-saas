import { useState, useContext } from "react";

import {
    Typography,
    TextField,
    Button,
    Stack,
    
} from "@mui/material";

import { Container, Card } from "./Login.styles";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {

            await login(email, password);

            alert("Login realizado!");

        } catch {

            alert("Usuário ou senha inválidos");

        }

    }

    return (

        <Container>

            <Card elevation={8}>

                <Stack spacing={3}>

                    <Typography
                        variant="h3"
                        textAlign="center"
                        fontWeight="bold"
                    >
                        CloudTask AI
                    </Typography>

                    <Typography
                        variant="h6"
                        textAlign="center"
                    >
                        Bem-vindo de volta 👋
                    </Typography>

                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLogin}
                    >
                        Entrar
                    </Button>

                    <Typography textAlign="center">
                        Ainda não possui conta?

                        <Link to="/cadastro">
                            Cadastre-se
                        </Link>

                    </Typography>
                </Stack>

            </Card>

        </Container>

    );
}
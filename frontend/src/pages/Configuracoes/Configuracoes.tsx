import {

    Typography,

    Switch,

    FormControlLabel,

    Divider,

    Button,

    Stack

} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";

import {

    Container,

    CardConfiguracoes

} from "./Configuracoes.styles";
import { useNavigate } from "react-router-dom";

export default function Configuracoes() {
    const navigate = useNavigate();
    
    return (

        <MainLayout>

            <Container>

                <CardConfiguracoes>

                    <Stack

                        spacing={3}

                        sx={{

                            mt: 4

                        }}

                    >

                        <FormControlLabel

                            control={<Switch defaultChecked />}

                            label="Receber notificações"

                        />

                        <FormControlLabel

                            control={<Switch />}

                            label="Tema escuro"

                        />

                        <Divider />

                        <Button

                            color="error"
                            variant="outlined"
                            onClick={() => {

                                localStorage.removeItem("token");

                                navigate("/");

                            }}

                        >

                            Encerrar sessão

                        </Button>

                    </Stack>

                </CardConfiguracoes>

            </Container>

        </MainLayout>

    );

}
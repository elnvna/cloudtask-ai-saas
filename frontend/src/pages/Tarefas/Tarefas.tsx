import { useEffect, useState } from "react";

import {
    Typography,
    Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import MainLayout from "../../layouts/MainLayout";

import { listarTarefas } from "../../services/tarefaService";

import type { Tarefa } from "../../types/tarefa";

import TarefaCard from "../../components/TarefaCard/TarefaCard";

import {
    Container,
    Header,
    CardsContainer
} from "./Tarefas.styles";

export default function Tarefas() {

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    async function carregar() {

        const dados = await listarTarefas();

        setTarefas(dados);

    }

    useEffect(() => {

        carregar();

    }, []);

    return (

        <MainLayout>

            <Container>

                <Header>

                    <div>

                        {/* <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold" }}
                        >
                            Tarefas
                        </Typography> */}

                        <Typography color="text.secondary">

                            Gerencie todas as suas tarefas

                        </Typography>

                    </div>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                    >

                        Nova tarefa

                    </Button>

                </Header>

                <CardsContainer>

                    {tarefas.map((tarefa) => (

                        <TarefaCard

                            key={tarefa.id}

                            tarefa={tarefa}

                        />

                    ))}

                </CardsContainer>

            </Container>

        </MainLayout>

    );

}
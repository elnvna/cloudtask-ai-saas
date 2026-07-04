import {
    Typography,
    Chip,
    Stack,
    Button
} from "@mui/material";

import type { Tarefa } from "../../types/tarefa";

import { StyledCard } from "./TarefaCard.styles";

interface Props {
    tarefa: Tarefa;
}

export default function TarefaCard({ tarefa }: Props) {

    return (

        <StyledCard>

            <Stack spacing={2}>

                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                >
                    {tarefa.titulo}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {tarefa.descricao}
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <Chip
                        label={tarefa.status}
                        color={
                            tarefa.status === "Concluida"
                                ? "success"
                                : tarefa.status === "Em andamento"
                                    ? "warning"
                                    : "default"
                        }
                    />

                    <Chip
                        label={tarefa.prioridade}
                        color={
                            tarefa.prioridade === "Alta"
                                ? "error"
                                : tarefa.prioridade === "Media"
                                    ? "warning"
                                    : "success"
                        }
                    />

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button variant="outlined">

                        Editar

                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                    >

                        Excluir

                    </Button>

                </Stack>

            </Stack>

        </StyledCard>

    );

}
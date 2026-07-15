import {
    Typography,
    Chip,
    Stack,
    Button,
    FormControl,
    Select,
    MenuItem,
    type SelectChangeEvent,
    Box
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlagIcon from "@mui/icons-material/Flag";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import InfoIcon from "@mui/icons-material/Info";

import type {
    Tarefa,
    StatusTarefa
} from "../../types/tarefa";

import { StyledCard } from "./TarefaCard.styles";

interface Props {

    tarefa: Tarefa;

    onEditar: (tarefa: Tarefa) => void;

    onExcluir: (tarefa: Tarefa) => void;

    onVerDetalhes?: (tarefa: Tarefa) => void;

    onStatusChange: (
        tarefa: Tarefa,
        status: StatusTarefa
    ) => void;

}

export default function TarefaCard({

    tarefa,

    onEditar,

    onExcluir,

    onVerDetalhes,

    onStatusChange

}: Props) {

    function alterarStatus(
        event: SelectChangeEvent
    ) {

        const novoStatus = event.target.value;

        if (
            novoStatus === "Pendente" ||
            novoStatus === "Em andamento" ||
            novoStatus === "Concluida"
        ) {

            onStatusChange(
                tarefa,
                novoStatus
            );

        }

    }

    return (

        <StyledCard>

            <Stack spacing={2} sx={{ height: "100%" }}>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {tarefa.titulo}
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        minHeight: 60,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                    }}
                >
                    {tarefa.descricao}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <Chip
                        icon={<FlagIcon />}
                        label={tarefa.prioridade}
                        color={
                            tarefa.prioridade === "Alta"
                                ? "error"
                                : tarefa.prioridade === "Media"
                                    ? "warning"
                                    : "success"
                        }
                    />

                    <Chip
                        icon={<TaskAltIcon />}
                        label={tarefa.status}
                        color={
                            tarefa.status === "Concluida"
                                ? "success"
                                : tarefa.status === "Em andamento"
                                    ? "warning"
                                    : "default"
                        }
                    />

                </Box>

                <FormControl fullWidth size="small">

                    <Select
                        value={tarefa.status}
                        onChange={alterarStatus}
                    >

                        <MenuItem value="Pendente">
                            Pendente
                        </MenuItem>

                        <MenuItem value="Em andamento">
                            Em andamento
                        </MenuItem>

                        <MenuItem value="Concluida">
                            Concluída
                        </MenuItem>

                    </Select>

                </FormControl>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <CalendarMonthIcon
                        fontSize="small"
                        color="disabled"
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >

                        {new Date(
                            tarefa.data_criacao
                        ).toLocaleDateString("pt-BR")}

                    </Typography>

                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        flexDirection: "column"
                    }}
                >

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                            fullWidth
                            size="small"
                            variant="outlined"
                            onClick={() => onEditar(tarefa)}
                        >
                            Editar
                        </Button>

                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => onExcluir(tarefa)}
                        >
                            Excluir
                        </Button>
                    </Box>

                    {onVerDetalhes && (
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<InfoIcon />}
                            onClick={() => onVerDetalhes(tarefa)}
                            sx={{ bgcolor: "info.main" }}
                        >
                            Detalhes
                        </Button>
                    )}

                </Box>

            </Stack>

        </StyledCard>

    );

}
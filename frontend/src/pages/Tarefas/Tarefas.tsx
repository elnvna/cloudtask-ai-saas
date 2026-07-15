import { useEffect, useState } from "react";

import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Paper,
    Box,
    useTheme
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import MainLayout from "../../layouts/MainLayout";

import {
    listarTarefas,
    excluirTarefa,
    atualizarTarefa
} from "../../services/tarefaService";

import TarefaCard from "../../components/TarefaCard/TarefaCard";

import ModalTarefa from "./ModalTarefa";

import { useNotification } from "../../hooks/useNotification";

import {
    Container,
    Header,
    CardsContainer
} from "./Tarefas.styles";

import type {
    Tarefa,
    StatusTarefa
} from "../../types/tarefa";

export default function Tarefas() {

    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [abrirModal, setAbrirModal] = useState(false);

    const [tarefaSelecionada, setTarefaSelecionada] =
        useState<Tarefa | null>(null);

    const [tarefaExcluir, setTarefaExcluir] =
        useState<Tarefa | null>(null);

    const [pesquisa, setPesquisa] = useState("");

    const [loadingExcluir, setLoadingExcluir] = useState(false);

    const { showNotification } = useNotification();

    const theme = useTheme();

    async function carregar() {

        try {

            const dados = await listarTarefas();

            setTarefas(dados);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        carregar();

    }, []);

    async function excluir() {

        if (!tarefaExcluir) return;

        setLoadingExcluir(true);

        try {

            await excluirTarefa(tarefaExcluir.id);

            showNotification("Tarefa excluída com sucesso!", "success");

            setTarefaExcluir(null);

            carregar();

        } catch (error) {

            showNotification("Erro ao excluir tarefa", "error");

        } finally {

            setLoadingExcluir(false);

        }

    }

    async function alterarStatus(

        tarefa: Tarefa,

        status: StatusTarefa

    ) {

        await atualizarTarefa(

            tarefa.id,

            {

                titulo: tarefa.titulo,

                descricao: tarefa.descricao,

                prioridade: tarefa.prioridade,

                status

            }

        );

        carregar();

    }

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        const pesquisaOk = tarefa.titulo
            .toLowerCase()
            .includes(pesquisa.toLowerCase());

        return pesquisaOk;
    });

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        t => t.status === "Pendente"
    ).length;

    const andamento = tarefas.filter(
        t => t.status === "Em andamento"
    ).length;

    const concluidas = tarefas.filter(
        t => t.status === "Concluida"
    ).length;

    return (

        <MainLayout>

            <Container>

                <Header>

                    <div>

                        <Typography 
                            variant="h5"
                            sx={{ color: theme.palette.mode === "dark" ? "#F1F5F9" : "#0F172A", fontWeight: "bold" }}
                        >

                            Gerencie todas as suas tarefas

                        </Typography>

                    </div>

                    <Button

                        variant="contained"

                        startIcon={<AddIcon />}

                        onClick={() => {

                            setTarefaSelecionada(null);

                            setAbrirModal(true);

                        }}

                    >

                        Nova tarefa

                    </Button>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mb: 4,
                            flexWrap: "wrap"
                        }}
                    >
                        <Paper
                            sx={{
                                width: 180,
                                height: 120,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 3,
                                boxShadow: 2,
                                flexShrink: 0
                            }}
                        >
                            <Typography variant="h4">
                                {total}
                            </Typography>

                            <Typography
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontWeight: 500
                                }}
                            >
                                Todas
                            </Typography>
                        </Paper>

                        <Paper
                            sx={{
                                width: 180,
                                height: 120,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 3,
                                boxShadow: 2,
                                flexShrink: 0
                            }}
                        >
                            <Typography
                                variant="h4"
                                color="warning.main"
                            >
                                {pendentes}
                            </Typography>

                            <Typography
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontWeight: 500
                                }}
                            >
                                Pendentes
                            </Typography>
                        </Paper>

                        <Paper
                            sx={{
                                width: 180,
                                height: 120,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 3,
                                boxShadow: 2,
                                flexShrink: 0
                            }}
                        >
                            <Typography
                                variant="h4"
                                color="info.main"
                            >
                                {andamento}
                            </Typography>

                            <Typography
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontWeight: 500,
                                    fontSize: 15
                                }}
                            >
                                Em andamento
                            </Typography>
                        </Paper>

                        <Paper
                            sx={{
                                width: 180,
                                height: 120,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 3,
                                boxShadow: 2,
                                flexShrink: 0
                            }}
                        >
                            <Typography
                                variant="h4"
                                color="success.main"
                            >
                                {concluidas}
                            </Typography>

                            <Typography
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontWeight: 500
                                }}
                            >
                                Concluídas
                            </Typography>
                        </Paper>
                    </Box>

                </Header>

                <TextField

                    fullWidth

                    placeholder="Pesquisar tarefas..."

                    sx={{ mb: 3 }}

                    value={pesquisa}

                    onChange={(e) =>

                        setPesquisa(e.target.value)

                    }

                />

                <CardsContainer>

                    {tarefasFiltradas.length === 0 ? (

                        <Typography>

                            Nenhuma tarefa encontrada.

                        </Typography>

                    ) : (

                        tarefasFiltradas.map((tarefa) => (

                            <TarefaCard

                                key={tarefa.id}

                                tarefa={tarefa}

                                onEditar={(tarefa) => {

                                    setTarefaSelecionada(tarefa);

                                    setAbrirModal(true);

                                }}

                                onExcluir={(tarefa) =>

                                    setTarefaExcluir(tarefa)

                                }

                                onStatusChange={alterarStatus}

                            />

                        ))

                    )}

                </CardsContainer>

                <ModalTarefa

                    open={abrirModal}

                    onClose={() => setAbrirModal(false)}

                    atualizarLista={carregar}

                    tarefa={tarefaSelecionada}

                />

                <Dialog

                    open={!!tarefaExcluir}

                    onClose={() =>

                        setTarefaExcluir(null)

                    }

                >

                    <DialogTitle>

                        Excluir tarefa

                    </DialogTitle>

                    <DialogContent>

                        Tem certeza que deseja excluir esta tarefa?

                    </DialogContent>

                    <DialogActions>

                        <Button

                            onClick={() =>

                                setTarefaExcluir(null)

                            }

                        >

                            Cancelar

                        </Button>

                        <Button

                            color="error"

                            variant="contained"

                            onClick={excluir}

                            disabled={loadingExcluir}

                        >

                            {loadingExcluir ? 'Excluindo...' : 'Excluir'}

                        </Button>

                    </DialogActions>

                </Dialog>

            </Container>

        </MainLayout>

    );

}
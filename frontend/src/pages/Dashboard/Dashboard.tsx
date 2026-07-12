import {

    Grid,

    Typography,

    Box

} from "@mui/material";

import MainLayout from "../../layouts/MainLayout";

import CircleStatCard from "../../components/CircleStatCard/CircleStatCard";

import { useDashboard } from "../../hooks/useDashboard";

export default function Dashboard() {

    const {

        total,

        pendentes,

        emAndamento,

        concluidas,

        produtividade

    } = useDashboard();

    return (

        <MainLayout>

            <Box

                sx={{

                    mb: 5

                }}

            >

                <Typography
                    variant="h5"
                    sx={{
                        mb: 5,
                        textAlign: "center",
                        color: "#48658D",
                        fontWeight: 500
                    }}
                >
                    Acompanhe o desempenho das suas tarefas
                </Typography>

                <Grid
                    container
                    sx={{
                        gap: "10px",
                        mb: 4,
                        justifyContent: "center"
                    }}
                >

                <Grid>
                    <CircleStatCard
                        titulo="Pendentes"
                        valor={pendentes}
                        porcentagem={total ? (pendentes / total) * 100 : 0}
                        cor="#FF9800"
                    />
                </Grid>

                <Grid>
                    <CircleStatCard
                        titulo="Em andamento"
                        valor={emAndamento}
                        porcentagem={total ? (emAndamento / total) * 100 : 0}
                        cor="#7C4DFF"
                    />
                </Grid>

                <Grid>
                    <CircleStatCard
                        titulo="Concluídas"
                        valor={concluidas}
                        porcentagem={total ? (concluidas / total) * 100 : 0}
                        cor="#22C55E"
                    />
                </Grid>

            </Grid>

            <Grid
                    container
                    sx={{
                        gap: "10px",
                        mb: 4,
                        justifyContent: "center"
                    }}
                >

                <Grid>
                    <CircleStatCard
                        titulo="Total"
                        valor={total}
                        porcentagem={100}
                        cor="#2563EB"
                    />
                </Grid>

                <Grid>
                    <CircleStatCard
                        titulo="Produtividade"
                        valor={`${produtividade}%`}
                        porcentagem={produtividade}
                        cor="#06B6D4"
                    />
                </Grid>

            </Grid>

            </Box>

        </MainLayout>

    );

}
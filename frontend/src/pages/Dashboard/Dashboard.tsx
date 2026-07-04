import { Grid } from "@mui/material";

import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import { useDashboard } from "../../hooks/useDashboard";

export default function Dashboard(){

    const { total, pendentes, emAndamento, concluidas, produtividade } = useDashboard();

    return(

        <MainLayout>

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                    <StatCard
                        titulo="Total de Tarefas"
                        valor={total}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                    <StatCard
                        titulo="Pendentes"
                        valor={pendentes}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                    <StatCard
                        titulo="Em andamento"
                        valor={emAndamento}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                    <StatCard
                        titulo="Concluídas"
                        valor={concluidas}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                    <StatCard
                        titulo="Produtividade"
                        valor={`${produtividade}%`}
                    />
                </Grid>

            </Grid>

        </MainLayout>

    );

}
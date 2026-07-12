import {
    Typography,
    CircularProgress
} from "@mui/material";

import {
    StyledCard,
    CircleContainer,
    CenterValue
} from "./CircleStatCard.styles";

interface Props {

    titulo: string;

    valor: number | string;

    porcentagem?: number;

    cor: string;

}

export default function CircleStatCard({

    titulo,

    valor,

    porcentagem = 100,

    cor

}: Props) {

    return (

        <StyledCard>

            <CircleContainer>

                <CircularProgress

                    variant="determinate"

                    value={100}

                    size={145}

                    thickness={3}

                    sx={{

                        color: "#ECECEC",

                        position: "absolute"

                    }}

                />

                <CircularProgress

                    variant="determinate"

                    value={porcentagem}

                    size={145}

                    thickness={4}

                    sx={{

                        color: cor

                    }}

                />

                <CenterValue>

                    <Typography

                        variant="h3"

                        sx={{

                            fontWeight: "bold"

                        }}

                    >

                        {valor}

                    </Typography>

                </CenterValue>

            </CircleContainer>

            <Typography

                variant="h6"

                sx={{

                    fontWeight: 700,

                    color: "#334155"

                }}

            >

                {titulo}

            </Typography>

        </StyledCard>

    );

}
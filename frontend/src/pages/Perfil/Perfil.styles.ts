import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({

    padding: theme.spacing(4),

    display: "flex",

    justifyContent: "center"

}));

export const CardPerfil = styled(Paper)(({ theme }) => ({

    width: 650,

    padding: theme.spacing(4),

    borderRadius: 20

}));
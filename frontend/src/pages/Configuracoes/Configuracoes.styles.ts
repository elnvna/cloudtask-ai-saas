import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({

    padding: theme.spacing(4),

    display: "flex",

    justifyContent: "center"

}));

export const CardConfiguracoes = styled(Paper)(({ theme }) => ({

    width: 650,

    padding: theme.spacing(4),

    borderRadius: 20

}));
import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9",
    padding: theme.spacing(3),
}));

export const Card = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 450,

    padding: theme.spacing(5),

    borderRadius: 20,

    boxShadow: "0 10px 35px rgba(0,0,0,0.12)",

    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));
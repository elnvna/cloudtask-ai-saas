import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

export const Container = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#111827",
});

export const Card = styled(Paper)({
    width: 500,
    padding: 40,
    borderRadius: 20,
});
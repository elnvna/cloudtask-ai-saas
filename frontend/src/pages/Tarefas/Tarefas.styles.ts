import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
}));

export const Header = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    gap: theme.spacing(2),
    flexWrap: "wrap",
}));

export const CardsContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: theme.spacing(3),
}));
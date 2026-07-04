import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    padding: theme.spacing(2),
    transition: "0.2s",

    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: theme.shadows[6],
    },
}));
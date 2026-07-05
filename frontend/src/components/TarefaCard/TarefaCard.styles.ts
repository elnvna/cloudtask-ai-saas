import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Card)(() => ({

    height: 360,

    padding: 20,

    borderRadius: 18,

    display: "flex",

    flexDirection: "column",

    transition: ".25s",

    boxShadow: "0 5px 15px rgba(0,0,0,.08)",

    "&:hover": {

        transform: "translateY(-5px)",

        boxShadow: "0 12px 28px rgba(0,0,0,.15)"

    }

}));
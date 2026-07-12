import { styled } from "@mui/material/styles";
import {
    Card,
    Box
} from "@mui/material";

export const StyledCard = styled(Card)(() => ({

    width: 210,

    height: 250,

    borderRadius: 20,

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    overflow: "hidden",

    boxSizing: "border-box",

    boxShadow: "0 8px 25px rgba(0,0,0,.08)",

    transition: ".25s",

    "&:hover": {

        transform: "translateY(-6px)",

        boxShadow: "0 12px 30px rgba(0,0,0,.15)"

    }

}));

export const CircleContainer = styled(Box)(() => ({

    position: "relative",

    display: "inline-flex",

    marginBottom: 18

}));

export const CenterValue = styled(Box)(() => ({

    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    flexDirection: "column"

}));
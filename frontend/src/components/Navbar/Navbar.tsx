import {

    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Box,
    IconButton,

} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/tarefas": "Tarefas",
    "/ia": "Assistente IA",
    "/calendario": "Calendário",
    "/perfil": "Perfil",
    "/configuracoes": "Configurações",
    };

    return (

        <AppBar
            position="static"
            color="inherit"
            elevation={1}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", flexGrow: 1 }}
                >
                    {titles[location.pathname] || "CloudTask AI"}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "right",
                        gap: 1,
                    }}
                >
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>

                    <Avatar>
                        E
                    </Avatar>
                </Box>

            </Toolbar>

        </AppBar>

    );

}
import {
    Dashboard,
    Assignment,
    Person,
    Settings,
    Logout,
} from "@mui/icons-material";

import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/dashboard",
        },
        {
            text: "Tarefas",
            icon: <Assignment />,
            path: "/tarefas",
        },
        {
            text: "Perfil",
            icon: <Person />,
            path: "/perfil",
        },
        {
            text: "Configurações",
            icon: <Settings />,
            path: "/configuracoes",
        },
    ];

    return (

        <Box
            sx={{
                width: 260,
                minHeight: "100vh",
                backgroundColor: "#111827",
                color: "white",
                display: "flex",
                flexDirection: "column",
                p: 3,
                position: "sticky",
                top: 0,
                alignSelf: "flex-start",
            }}
        >

            <Typography
                variant="h5"
                sx={{ fontWeight: "bold", mb: 5 }}
            >
                ☁ CloudTask AI
            </Typography>

            <List>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 1,

                            "&.Mui-selected": {
                                backgroundColor: "#2563eb",
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor: "#1d4ed8",
                            },

                            "&:hover": {
                                backgroundColor: "#1f2937",
                            },
                        }}
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",
                                minWidth: 40,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.text} />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <List>

                <ListItemButton
                    onClick={() => {

                        localStorage.removeItem("token");

                        navigate("/");

                    }}
                    sx={{
                        borderRadius: 2,

                        "&:hover": {
                            backgroundColor: "#dc2626",
                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            color: "white",
                            minWidth: 40,
                        }}
                    >
                        <Logout />
                        
                    </ListItemIcon>

                    <ListItemText primary="Sair" />

                </ListItemButton>

            </List>

        </Box>

    );

}
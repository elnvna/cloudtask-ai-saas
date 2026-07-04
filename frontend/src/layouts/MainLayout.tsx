import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

interface Props{

    children: React.ReactNode;

}

export default function MainLayout({children}:Props){

    return(

        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                minHeight: "100vh",
            }}
        >

            <Sidebar/>

            <Box
                sx={{
                    flex: 1,
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                }}
            >

                <Navbar/>

                <Box 
                    sx={{ p: 4 }}>

                    {children}

                </Box>

            </Box>

        </Box>

    );

}
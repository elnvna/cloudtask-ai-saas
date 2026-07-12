import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {

    open: boolean;

    message: string;

    severity: "success" | "error" | "warning" | "info";

    onClose: () => void;

}

export default function AppSnackbar({

    open,

    message,

    severity,

    onClose

}: Props) {

    return (

        <Snackbar

            open={open}

            autoHideDuration={3000}

            onClose={onClose}

            anchorOrigin={{

                vertical: "bottom",

                horizontal: "right"

            }}

        >

            <Alert

                severity={severity}

                variant="filled"

                onClose={onClose}

                sx={{

                    width: "100%",

                    borderRadius: 2

                }}

            >

                {message}

            </Alert>

        </Snackbar>

    );

}
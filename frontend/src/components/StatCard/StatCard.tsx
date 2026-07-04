import {

    Card,
    CardContent,
    Typography,

} from "@mui/material";

interface Props{

    titulo:string;

    valor:number|string;

}

export default function StatCard({

    titulo,

    valor

}:Props){

    return(

        <Card>

            <CardContent>

                <Typography
                    color="text.secondary"
                >
                    {titulo}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold" }}
                >
                    {valor}
                </Typography>

            </CardContent>

        </Card>

    );

}
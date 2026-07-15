import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "120px",
            fontWeight: "bold",
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Página não encontrada
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 3, maxWidth: 500 }}
        >
          Desculpe, a página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/dashboard")}
          sx={{ mt: 2 }}
        >
          Voltar ao Dashboard
        </Button>
      </Box>
    </Container>
  );
}

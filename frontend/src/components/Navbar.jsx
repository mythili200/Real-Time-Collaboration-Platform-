import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        backdropFilter: "blur(10px)",
      }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard")}>
          🚀 Collab App
        </Typography>

        <Box>
          <Button
            onClick={() => navigate("/dashboard")}
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                color: "#ffd369",
                transform: "scale(1.1)",
              },
            }}>
            Dashboard
          </Button>

          <Button
            onClick={() => navigate("/files")}
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                color: "#ffd369",
                transform: "scale(1.1)",
              },
            }}>
            Files
          </Button>

          <Button
            color="inherit"
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                color: "#ffd369",
                transform: "scale(1.1)",
              },
            }}
            onClick={() => navigate("/chat")}>
            Chat
          </Button>
          <Button
            // onClick={handleLogout}
            sx={{
              color: "#fff",
              mx: 1,
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": { color: "#ff4d4f", transform: "scale(1.1)" },
            }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

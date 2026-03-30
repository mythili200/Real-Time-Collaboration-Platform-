import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { keyframes } from "@mui/system";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await API.post("/auth/login", data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        height: "98vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(-45deg, #667eea, #764ba2, #6a11cb, #2575fc)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 10s ease infinite`,
      }}>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
            🚀 Welcome Back
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(to right, #667eea, #764ba2)",
              "&:hover": {
                background: "linear-gradient(to right, #5a67d8, #6b46c1)",
              },
            }}
            onClick={handleLogin}>
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

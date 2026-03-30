import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/files/upload", formData);
      alert("File uploaded successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #4facfe, #00f2fe, #667eea, #764ba2)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        padding: 4,
        position: "relative",
        overflow: "hidden",

        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },

        "&::before": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          top: "-80px",
          left: "-80px",
          filter: "blur(80px)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          bottom: "-60px",
          right: "-60px",
          filter: "blur(80px)",
        },
      }}>
      <Container maxWidth="md">
        {/* Welcome Card */}
        <Card
          sx={{
            borderRadius: 4,
            mb: 3,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-6px) scale(1.01)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            },
          }}>
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(to right, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Welcome 👋
            </Typography>

            {user && (
              <Typography variant="h6" color="text.secondary">
                {user.name}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Upload Card */}
        <Card
          sx={{
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",

            "&:hover": {
              transform: "translateY(-6px) scale(1.01)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
            },
          }}>
          <CardContent>
            <Typography variant="h5" mb={2}>
              Upload File 📂
            </Typography>

            <input
              type="file"
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100%",
                background: "#fff",
              }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 2,
                py: 1,
                fontWeight: "bold",
                background: "linear-gradient(to right, #667eea, #764ba2)",
                transition: "0.3s",

                "&:hover": {
                  background: "linear-gradient(to right, #5a67d8, #6b46c1)",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleUpload}>
              Upload 🚀
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

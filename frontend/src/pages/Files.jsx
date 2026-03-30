import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function Files() {
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    try {
      const res = await API.get("/files/all");
      setFiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/file/${id}`);
    getFiles();
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        py: 5,
      }}>
      <Container>
        <Typography
          variant="h3"
          align="center"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            mb: 4,
            letterSpacing: 1,
          }}>
          📂 Your Files
        </Typography>

        {files.length === 0 ? (
          <Typography align="center" sx={{ color: "#fff", mt: 5 }}>
            No files yet 😢 Upload something!
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {files?.data?.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file._id}>
                <Card
                  sx={{
                    borderRadius: 5,
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.03)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                    },
                  }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <img
                        src={file.fileUrl}
                        alt="file"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      <Typography variant="h6" noWrap>
                        {file.originalName || "File"}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => handleDelete(file._id)}
                      sx={{
                        color: "#ff6b6b",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

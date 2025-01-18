import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import HeaderRegistered from "../components/HeaderRegistered";

import muralBackground from "../assets/photos/mural.png";

const API_BASE_URL = import.meta.env.VITE_BASE || "http://localhost:8080";

interface ReportedStory {
  id: number;
  description: string;
}

const ReportPage: React.FC = () => {
  const [reportedStories, setReportedStories] = useState<ReportedStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/reports`);
        if (!response.ok) {
          throw new Error("Failed to fetch reported stories.");
        }
        const data = await response.json();
        setReportedStories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${muralBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        textAlign="center"
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${muralBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: "white",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${muralBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 4,
        color: "white",
        paddingTop: "120px",
      }}
    >
      <HeaderRegistered />

      <Box
        sx={{
          padding: "1rem 2rem",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textShadow: "4px 4px 16px rgba(0, 0, 0, 0.8)",
            fontSize: "2.5rem",
            color: "white",
          }}
        >
          Reported Stories
        </Typography>
      </Box>

      {reportedStories.length === 0 ? (
        <Typography sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          No reported stories available.
        </Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{
            margin: "0 auto",
            maxWidth: "90%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      backgroundColor: "#6c757d",
                      color: "white",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      backgroundColor: "#6c757d",
                      color: "white",
                    }}
                  >
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell
                      sx={{
                        fontSize: "1rem",
                        color: "#495057",
                      }}
                    >
                      {story.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1rem",
                        color: "#495057",
                      }}
                    >
                      {story.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ReportPage;

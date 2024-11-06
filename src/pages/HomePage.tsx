import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import muralImage from "../photos/mural.png";

const HomePage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${muralImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Header />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        Welcome to HoodClassics
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "2rem",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        Discover unknown stories from local places. Please register or login to
        continue.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1.5rem",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            textTransform: "none",
            borderColor: "#9c27b0",
            color: "#fff",
            backgroundColor: "rgba(156, 39, 176, 0.2)",
            boxShadow: "0px 4px 15px rgba(156, 39, 176, 0.6)",
            "&:hover": {
              borderColor: "#7b1fa2",
              backgroundColor: "#9c27b0",
              color: "#fff",
              boxShadow: "0px 8px 25px rgba(156, 39, 176, 0.8)",
            },
          }}
        >
          Register
        </Button>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            textTransform: "none",
            borderColor: "#9c27b0",
            color: "#fff",
            backgroundColor: "rgba(156, 39, 176, 0.2)",
            boxShadow: "0px 4px 15px rgba(156, 39, 176, 0.6)",
            "&:hover": {
              borderColor: "#7b1fa2",
              backgroundColor: "#9c27b0",
              color: "#fff",
              boxShadow: "0px 8px 25px rgba(156, 39, 176, 0.8)",
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;

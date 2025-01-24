import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import muralImage from "../assets/photos/mural.png";
const API_BASE_URL = import.meta.env.VITE_BASE || 'http://localhost:8080'; 

const HomePage = () => {
  
  const navigate = useNavigate();

  const handleGoToMap = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/mapRegistered`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.status === 401) {
        throw new Error("You are not authorized to access this page. Please log in.");
      }

      if (response.ok) {
        navigate("/mapRegistered");
        window.location.reload();
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Something went wrong. Please try again.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };


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
        "@media (max-width: 600px)": { 
          backgroundPosition: "top", 
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 0,
        }}
      />

      <Header />
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: "2rem",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          zIndex: 1,
          "@media (max-width: 600px)": {
            fontSize: "1.8rem", 
          },
        }}
      >
        Welcome to HoodClassics
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "white",
          fontWeight: "bold",
          marginBottom: "2rem",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          zIndex: 1,
          
          "@media (max-width: 600px)": {
            fontSize: "1.2rem", 
            marginBottom: "1rem", 
          },
        }}
      >
        Discover unknown stories from local places. 
        Please create an account or sign in to continue.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1.5rem",
          flexDirection: "row",
          justifyContent: "center",
          zIndex: 1,
          "@media (max-width: 600px)": {
            flexDirection: "column", 
            gap: "1rem", 
          },
        }}
      >
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            textTransform: "none",
            color: "white",
            backgroundColor: "rgba(212, 111, 38, 0.9)",
            borderColor: "#B75A1E",
            borderRadius: "8px",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 155, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
            },
            "@media (max-width: 600px)": {
              fontSize: "1.2rem", 
              padding: "0.8rem 1.5rem", 
            },
          }}
        >
          Sign Up
        </Button>

        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            textTransform: "none",
            color: "white",
            backgroundColor: "rgba(212, 111, 38, 0.9)",
            borderColor: "#B75A1E",
            borderRadius: "8px",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 155, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
            },
            "@media (max-width: 600px)": {
              fontSize: "1.2rem", 
              padding: "0.8rem 1.5rem", 
            },
          }}
        >
          Sign In
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          zIndex: 1,
          "@media (max-width: 600px)": {
            marginBottom: "1rem",
          },
        }}
      >
        <Button
      onClick={handleGoToMap}
      variant="outlined"
      sx={{
        padding: "1rem 2rem",
        fontSize: "1.5rem",
        textTransform: "none",
        color: "white",
        backgroundColor: "rgba(255, 165, 60, 0.9)",
        borderColor: "#B75A1E",
        borderRadius: "8px",
        transition: "transform 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 180, 72, 0.9)",
          color: "white",
          transform: "scale(1.05)",
          borderColor: "#9E4E1E",
        },
        "@media (max-width: 600px)": {
          fontSize: "1.2rem",
          padding: "0.8rem 1.5rem",
        },
      }}
    >
      Go to Map
    </Button>
      </Box>

      <Typography 
        variant="h5" 
        sx={{
          color: "white",
          fontWeight: "bold",
          marginBottom: "2rem",
          marginTop: "5rem",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          zIndex: 1,
          "@media (max-width: 600px)": {
            fontSize: "1.2rem", 
            marginTop: "2rem", 
          },
        }}
      >
        Start exploring as a tourist (no sign-up required).
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          zIndex: 1,
          gap: "1.5rem",
          "@media (max-width: 600px)": {
            marginBottom: "1rem", 
          },
        }}
      >
        <Button
          component={Link}
          to="/map"
          variant="outlined"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            textTransform: "none",
            color: "white",
            backgroundColor: "rgba(255, 165, 60, 0.9)",
            borderColor: "#B75A1E",
            borderRadius: "8px",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 180, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
            },
            "@media (max-width: 600px)": {
              fontSize: "1.2rem", 
              padding: "0.8rem 1.5rem", 
            },
          }}
        >
          Try as a tourist
        </Button>

      </Box>
    </Box>
  );
};

export default HomePage;
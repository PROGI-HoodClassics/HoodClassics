import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import muralImage from "../assets/photos/mural.png";

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
            transition:
                "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 155, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
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
            transition:
                "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 155, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
      <Typography variant = "h5" 
        sx = {{
        color: "white",
        fontWeight: "bold",
        marginBottom: "2rem",
        marginTop: "5rem",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
        zIndex: 1,
      }}>
        Start exploring as a tourist (no sign-up required).
      </Typography>

      <Box sx = {{
        display: "flex",
        justifyContent: "center",
        zIndex: 1,
      }}>
        <Button component={Link}
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
            transition:
                "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 180, 72, 0.9)",
              color: "white",
              transform: "scale(1.05)",
              borderColor: "#9E4E1E",
            },
          }}>
          Try as a tourist
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;

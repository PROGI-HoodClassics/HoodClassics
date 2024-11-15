import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/photos/logo1.jpg";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }

  return (
    <AppBar position="fixed" sx={styles.header}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem", 
        }}
      >
        <Box sx={styles.leftSection}>
          <Box
            onClick={handleHomeClick}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.08)",
              },
            }}
          >
            <img
              src={logo}
              style={{
                width: "100px",
                height: "auto",
                marginRight: "1rem",
                marginBottom: "0.3rem",
                marginTop: "0.4rem",
              }}
            />
          </Box>
          <Typography variant="h4" sx={styles.title} onClick={handleHomeClick}>
            HoodClassics
          </Typography>
        </Box>
        <div style={styles.navLinks}>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={styles.link}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={styles.link}
          >
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  header: {
    backgroundColor: "rgb(197, 105, 54)",
    padding: "0 2rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    "@media (max-width: 768px)": {
      padding: "0 1rem", 
    },
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
    fontSize: "2.5rem",
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: "2px",
    transition: "transform 0.2s ease, text-shadow 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      textShadow: "2px 2px 8px rgba(255, 155, 72, 0.4)",
    },
    "@media (max-width: 768px)": {
      fontSize: "2rem", 
    },
    "@media (max-width: 600px)": {
      fontSize: "1.5rem", 
    },
  },
  navLinks: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column", 
      alignItems: "center",    
    },
  },
  link: {
    marginLeft: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "transform 0.2s ease, background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#D46F26",
      color: "white",
      transform: "scale(1.05)",
      textShadow: "2px 2px 8px rgba(255, 155, 72, 0.4)",
    },
    "@media (max-width: 600px)": {
      marginLeft: "0", 
      marginBottom: "1rem", 
    },
  },
};

export default Header;

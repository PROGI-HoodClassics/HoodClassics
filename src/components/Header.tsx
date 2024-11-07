import React from "react";
import { Link } from "react-router-dom";
import logo from "../photos/logo.png";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" sx={styles.header}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={styles.leftSection}>
          <img
            src={logo}
            alt="HoodClassics Logo"
            style={{
              width: "100px",
              height: "auto",
              marginRight: "1rem",
              marginBottom: "0.4rem",
              marginTop: "0.4rem",
            }}
          />
          <Typography variant="h4" sx={styles.title}>
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
          <Button color="inherit" component={Link} to="/login" sx={styles.link}>
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  header: {
    backgroundColor: "#B34700",
    padding: "0 2rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
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
  },
  navLinks: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    marginLeft: "1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "transform 0.2s ease, text-shadow 0.2s ease",
    "&:hover": {
      backgroundColor: "#D46F26",
      color: "white",
      transform: "scale(1.05)",
      textShadow: "2px 2px 8px rgba(255, 155, 72, 0.4)",
    },
  },
};

export default Header;

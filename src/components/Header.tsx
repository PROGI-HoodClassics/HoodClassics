import React from 'react';
import { Link } from "react-router-dom";
import logo from '../photos/logo.png';
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="fixed" sx={styles.header}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={styles.leftSection}>
          <img src={logo} alt="HoodClassics Logo" style={{ width: '150px', height: 'auto', marginRight: '1rem' }} />
          <Typography variant="h4" sx={styles.title}>
            HoodClassics
          </Typography>
        </Box>
        <div style={styles.navLinks}>
          <Button color="inherit" component={Link} to="/register" sx={styles.link}>
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
    backgroundColor: "#FF5722",
    padding: "0 2rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  leftSection: {
    display: 'flex', 
    alignItems: 'center',
  },
  title: {
    marginLeft: '0.5rem',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: '2px',
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
    '&:hover': {
      backgroundColor: "#FF7043",
    },
  },
};

export default Header;

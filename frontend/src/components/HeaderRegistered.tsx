import { useNavigate } from "react-router-dom";
import logo from "../assets/photos/logo1.jpg";
import returnIcon from "../assets/photos/return_icon.png";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const HeaderRegistered = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }
  const handleMapRegisteredClick = () =>{
    navigate('/profilePage')
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
                width: "80px",
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


        <Box style={styles.navLinks}>
        <Box  
        onClick={handleMapRegisteredClick}
        sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}>
          <img src={returnIcon}
          style={{
            width: "88px",
            height: "88px",
          }}  
        />
        </Box>
            <Box sx={styles.text}>
                Logged in
            </Box>
        </Box>
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
      fontSize: "1rem", 
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
  text: {
    marginLeft: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    "@media (max-width: 600px)": {
      marginLeft: "0", 
      marginBottom: "1rem", 
    },
  },
};

export default HeaderRegistered;

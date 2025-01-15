import { useNavigate } from "react-router-dom";
import logo from "../assets/photos/logo1.jpg";
import returnIcon from "../assets/photos/pfp.png";
import reportIcon from "../assets/photos/reportIcon.png";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const HeaderRegistered = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }
  const handleMapRegisteredClick = () =>{
    navigate('/profilePage')
  }
  const handleReportClick = () => {
    navigate('/reportPage')
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
        <Box sx={styles.leftSection}
            onClick={handleHomeClick}>
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
          <Typography variant="h4" sx={styles.title} onClick={handleHomeClick}>
            HoodClassics
          </Typography>
        </Box>


        <Box style={styles.navLinks}>
        <Box
        onClick={handleReportClick}
        sx={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",   
          justifyContent: "center",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}>
          <img src={reportIcon}
          style={styles.imgStyle} />
        <Typography 
          sx={{
            marginTop: "-1px", 
            marginBottom: "8px",
            fontWeight: "bold", 
            fontSize: "17px",
          }}
        >
            Report
          </Typography>
        </Box>

        <Box  
        onClick={handleMapRegisteredClick}
        sx={{
              display: "flex",
              flexDirection: "column", 
              alignItems: "center",    
              justifyContent: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}>
          <img src={returnIcon}
          style={styles.imgStyle}  
        />
         <Typography
          sx={{
            marginTop: "-1px", 
            marginBottom: "8px",
            fontWeight: "bold", 
            fontSize: "15px",
          }}
        >
          My Profile
        </Typography>
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1100,
    backgroundColor: "rgb(197, 105, 54)",
    padding: "0 2rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    "@media (max-width: 768px)": {
      padding: "0 1rem", 
    },
  },
  imgStyle: {
    filter: "invert(100%)",
    width: "50px",
    height: "50px",
    marginTop: "5px",
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",         
    transition: "transform 0.3s ease", 
    "&:hover": {
      transform: "scale(1.08)", 
      cursor: "pointer",       
    },
  },
  title: {
    marginLeft: "-0.5rem",
    fontWeight: "bold",
    fontSize: "2.5rem",
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: "2px",
    transition: "transform 0.3s ease, text-shadow 0.2s ease",
    "&:hover": {
      textShadow: "2px 2px 8px rgba(255, 155, 72, 0.4)",
    },
    "@media (max-width: 768px)": {
      fontSize: "2rem", 
    },
    "@media (max-width: 600px)": {
      fontSize: "1rem", 
    },
  },
  reportText:{
    marginLeft: "0.5rem",
    marginRight: "2rem",
    fontWeight: "bold",
    fontSize: "2rem",
    fontFamily: "'Roboto', sans-serif",
    letterSpacing: "2px",
    transition: "transform 0.2s ease, text-shadow 0.2s ease",
    "&:hover": {
      transform: "scale(1.05)",
      textShadow:  "2px 2px 8px rgba(255, 255, 255, 0.4)",
      color: "rgba(255, 254, 254, 0.86)",
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
    gap: "1.5rem",
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

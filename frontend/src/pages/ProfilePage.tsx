import React, { useState } from "react";
import { Box, Container, TextField, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Header from "../components/Header";
import muralImage from "../assets/photos/mural.png";
import pfp from "../assets/photos/pfp.jpg";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    age: "",
    placeOfBirth: "",
    placeOfLiving: "",
  });

  const [profileImage, setProfileImage] = useState(pfp); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); 
      };
      reader.readAsDataURL(file);
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
      }}
    >
      <Header />
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          width: "auto",
          maxWidth: "400px",
          height: "auto",
          maxHeight: "600px",
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xs">
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            {}
            <Box
              sx={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                marginBottom: 3,
                overflow: "hidden",
                border: "2px solid #ccc",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%", 
                    position: "relative", 
                }}
              />
              <IconButton
                sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 15,
                    backgroundColor: "rgba(104, 105, 102, 0.5)",
                    borderRadius: "50%",
                    padding: "8px",
                    transition: "background-color 0.3s, transform 0.3s",
                    "&:hover": {
                    backgroundColor: "rgba(104, 105, 102, 0.8)", 
                    transform: "scale(1.2)", 
                    },
                    "& svg": {
                    color: "white", 
                    },
                }}
                size="large"
                aria-label="Upload photo"
                onClick={() => document.getElementById("file-input")?.click()}  // Trigger file input on click
              >
                <PhotoCamera sx={{ fontSize: "2rem" }} />
              </IconButton>

              {}
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Box>

            <Typography variant="h4" align="center" color="black">
              Edit profile
            </Typography>
            <form>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label="Surname"
                name="surname"
                fullWidth
                margin="normal"
                value={user.surname}
                onChange={handleChange}
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                fullWidth
                margin="normal"
                value={user.age}
                onChange={handleChange}
              />
            
              <TextField
                label="Place of Living"
                name="placeOfLiving"
                fullWidth
                margin="normal"
                value={user.placeOfLiving}
                onChange={handleChange}
              />
            </form>
            <Box sx={{ mt: 4, textAlign: "left", width: "100%" }}>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Surname:</strong> {user.surname}</Typography>
              <Typography><strong>Age:</strong> {user.age}</Typography>
              <Typography><strong>Place of Living:</strong> {user.placeOfLiving}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;
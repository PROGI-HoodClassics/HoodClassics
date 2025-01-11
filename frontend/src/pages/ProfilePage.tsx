import React, { useState } from "react";
import { Box, Container, TextField, Typography, IconButton, Button } from "@mui/material";
import { PhotoCamera, Add, Delete } from "@mui/icons-material";
import Header from "../components/Header";
import muralImage from "../assets/photos/mural.png";
import pfp from "../assets/photos/pfp.jpg";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    placesOfLiving: [""], 
  });

  const [profileImage, setProfileImage] = useState(pfp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;

    if (name === "placesOfLiving" && index !== undefined) {
      setUser((prevUser) => {
        const updatedPlaces = [...prevUser.placesOfLiving];
        updatedPlaces[index] = value;
        return {
          ...prevUser,
          placesOfLiving: updatedPlaces,
        };
      });
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const addPlaceOfLiving = () => {
    setUser((prevUser) => ({
      ...prevUser,
      placesOfLiving: [...prevUser.placesOfLiving, ""],
    }));
  };

  const removePlaceOfLiving = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      placesOfLiving: prevUser.placesOfLiving.filter((_, i) => i !== index),
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
          top: "13%",
          width: "auto",
          maxWidth: "400px",
          height: "auto",
          maxHeight: "640px",
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xs">
          <Box sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box
              sx={{
                width: "115px",
                height: "115px",
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
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <PhotoCamera sx={{ fontSize: "1.5rem" }} />
              </IconButton>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Box>

            <Typography variant="h5" align="center" color="black">
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

              {}
              <Box
                sx={{
                  width: "100%", 
                  maxHeight: "200px", 
                  overflowY: "auto",  
                  mb: 2, 
                }}
              >
                {user.placesOfLiving.map((place, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <TextField
                      label={`Place of Living ${index + 1}`}
                      name="placesOfLiving"
                      fullWidth
                      margin="normal"
                      value={place}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <IconButton
                      onClick={() => removePlaceOfLiving(index)}
                      sx={{ ml: 2 }}
                      aria-label="Remove place"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Button
                onClick={addPlaceOfLiving}
                startIcon={<Add />}
                sx={{ mt: 2 }}
                variant="outlined"
              >
                Add Place
              </Button>
            </form>
            <Box sx={{ mt: 4, textAlign: "left", width: "100%" }}>
              <Typography><strong>Name:</strong> {user.name}</Typography>
              <Typography><strong>Surname:</strong> {user.surname}</Typography>
              <Typography><strong>Places of Living:</strong></Typography>
              <ul>
                {user.placesOfLiving.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;

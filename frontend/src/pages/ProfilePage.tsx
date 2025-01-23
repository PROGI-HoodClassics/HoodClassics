import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useNavigate } from "react-router-dom";
import HeaderRegistered from "../components/HeaderRegistered";

const API_BASE_URL = import.meta.env.VITE_BASE || 'http://localhost:8080'; 

const ProfilePage: React.FC = () => {
  const [placesOfLiving, setPlacesOfLiving] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const SelectLocationMap = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPlacesOfLiving((prev) => [...prev, { lat, lng }]);
      },
    });

    return null;
  };

  const removePlace = (index: number) => {
    setPlacesOfLiving((prev) => prev.filter((_, i) => i !== index));
  };

  const savePlaces = async () => {
    try {
      const requestBody = {
        towns: placesOfLiving.map((place) => ({
          lat: place.lat,
          lng: place.lng,
        })),
      };
  
      const response = await fetch(`${API_BASE_URL}/users/town`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(requestBody), 
      });
  
      if (response.ok) {
        console.log("Places saved successfully!");
        navigate("/mapRegistered");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to save places. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while saving places. Please try again.");
      console.error("Save places request error:", error);
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
      <HeaderRegistered />
      <Box
        sx={{
          position: "absolute",
          top: "14%",
          width: "90%",
          maxWidth: "800px",
          backgroundColor: "white",
          borderRadius: 4,
          overflow: "hidden",
          padding: 4,
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 2, color: "black", fontWeight: "bold" }}>
          Select Your Places of Living
        </Typography>

        {}
        <Box sx={{ height: "400px", width: "100%", mb: 4, border: "1.5px solid black" }}>
          <MapContainer
            center={[45.8004, 15.9714]} 
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <SelectLocationMap />
            {placesOfLiving.map((place, index) => (
              <Marker
                key={index}
                position={[place.lat, place.lng]}
                icon={customIcon}
              />
            ))}
          </MapContainer>
        </Box>

        {}
        <Typography variant="h6" sx={{ mb: 2, color: "black", fontWeight: "bold" }}>
          Selected Places:
        </Typography>
        
    <Box
      sx={{
        maxHeight: "150px", 
        overflowY: "auto",  
        border: "1px solid #ccc", 
        borderRadius: 2, 
        padding: 1, 
      }}
    >
      <List>
        {placesOfLiving.map((place, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <ListItemText
              primary={`Lat: ${place.lat.toFixed(4)}, Lng: ${place.lng.toFixed(4)}`}
            />
            <IconButton onClick={() => removePlace(index)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>


        {error && (
          <Typography sx={{ mt: 2, color: "red" }}>{error}</Typography>
        )}

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={savePlaces}
          >
            Save Places
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

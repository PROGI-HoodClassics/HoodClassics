import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { usePins } from "../context/PinContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// MUI components
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redPinImage from "../assets/photos/red-pin.png";

const MapPage = () => {
    return (
        <>
            <Header />
            <div>View Pins</div>
            <UserMap />
        </>
    );
};

const redIcon = new L.Icon({
    iconUrl: redPinImage,
    iconSize: [40, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -40],
});

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const UserMap = () => {
    const initialPosition: [number, number] = [45.8004, 15.9714];
    const { pins, updatePins, fetchPin } = usePins();

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [activePin, setActivePin] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    updatePins(
                        pins,
                        [position.coords.longitude, position.coords.latitude]
                    );
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleMoveEnd = async (latLng: [number, number]) => {
        await updatePins(pins, latLng);
    };

    const handlePinClick = async (pin: any) => {
        console.log("PIN JE KLIKNUT" + pin.story_id);

        if (pin.story_id) {
            const selectedPin = await fetchPin(pin.story_id);
            setActivePin(selectedPin);
            console.log("Kliknut pin" + pin.title + pin.text);
            setDrawerOpen(true);
        }

    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setActivePin(null);
    };

    return (
        <>
            {/* The map */}
            <MapContainer center={initialPosition} zoom={13} style={{ width: "100vw", height: "100vh" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <MoveEndHandler onMoveEnd={handleMoveEnd} />

                {/* Markers for pins */}
                {pins
                    .filter((pin: any) => pin !== undefined)
                    .map((pin: any, index: number) => (
                        <Marker
                            key={pin.story_id || index}
                            position={pin.position}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => handlePinClick(pin),
                            }}
                        />
                    ))
                }

                {/* Marker for the user location (red pin) */}
                {userLocation && (
                    <Marker position={userLocation} icon={redIcon} />
                )}
            </MapContainer>

            {/* Material-UI Drawer for pin details */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
            >
                {/*

        */}
                <Box sx={{ width: 500, p: 2, maxWidth: "80vw" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" component="div">
                            Pin Details
                        </Typography>
                        <IconButton onClick={closeDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {activePin ? (
                        <>
                            <Typography variant="title1" gutterBottom>
                                <strong>Title:</strong> {activePin.title || "N/A"}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {activePin.text || "No description."}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Likes:</strong> {activePin.likes || 0}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2">No pin selected.</Typography>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

const MoveEndHandler = ({ onMoveEnd }: { onMoveEnd: (latLng: [number, number]) => Promise<void> }) => {
    const map = useMapEvents({
        moveend: async () => {
            const position = map.getCenter();
            await onMoveEnd([position.lat, position.lng]);
        },
    });
    return null;
};

export default MapPage;

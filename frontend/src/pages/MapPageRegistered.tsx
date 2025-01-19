import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import HeaderRegistered from "../components/HeaderRegistered";
import { usePins } from "../context/PinContext";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Drawer, Box, Typography, IconButton, TextField, Button, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redPinImage from "../assets/photos/red-pin.png";

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl: redPinImage,
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -40],
});

const MapPageRegistered = () => {
    return (
        <>
            <HeaderRegistered />
            <div>Add Pins</div>
            <UserMap />
        </>
    );
};

type PinData = {
    story_id?: string;
    position: [number, number];
    title?: string;
    text?: string;
    likes?: number;
};

const UserMap = () => {
    const initialPosition: [number, number] = [45.8004, 15.9714];
    const { pins, addPin, updatePins, fetchPin, likePin } = usePins();

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"create" | "view" | null>(null);

    const [activePin, setActivePin] = useState<PinData | null>(null);
    const [newPinData, setNewPinData] = useState<PinData | null>(null);
    const [canAddPins, setCanAddPins] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserLocation([pos.coords.latitude, pos.coords.longitude]);
                    updatePins(pins, [pos.coords.longitude, pos.coords.latitude]);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleToggleAddPins = () => {
        setCanAddPins((prev) => !prev);
    };


    const handleMapClick = (latlng: [number, number]) => {
        if (!canAddPins) {
            return;
        }
        setDrawerMode("create");
        setNewPinData({
            position: latlng,
            title: "",
            text: "",
        });
        setDrawerOpen(true);
    };

    const handlePinClick = async (pin: PinData) => {
        if (pin.story_id) {
            const fetchedPin = await fetchPin(pin.story_id);
            setActivePin(fetchedPin);
        } else {
            setActivePin(pin);
        }
        setDrawerMode("view");
        setDrawerOpen(true);
    };

    const handleSaveNewPin = async () => {
        if (!newPinData) return;
        // Validate required fields
        if (!newPinData.title || !newPinData.text) {
            alert("Please fill in both the title and text!");
            return;
        }
        // Add the pin via context
        await addPin(newPinData);
        // Reset creation form and close Drawer
        setNewPinData(null);
        setDrawerOpen(false);
        setDrawerMode(null);
    };
    const handleLike = async () => {
        if (!activePin?.story_id) return;
        await likePin(activePin.story_id);
        setActivePin((prev) =>
            prev ? {...prev, likes: prev.likes! + 1} : null
        );
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setDrawerMode(null);
        setActivePin(null);
        setNewPinData(null);
    };

    const handleMoveEnd = async (latLng: [number, number]) => {
        // The position param is lat,lng, but your updatePins might need [lng, lat]
        await updatePins(pins, [latLng[1], latLng[0]]);
    };

    return (
        <>
            <MapContainer
                center={initialPosition}
                zoom={13}
                style={{ width: "100vw", height: "calc(100vh - 64px)", marginTop: "64px" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <MoveEndHandler onMoveEnd={handleMoveEnd} />
                <ClickHandler onMapClick={handleMapClick} />

                {/* Existing pins */}
                {pins
                    .filter((pin: any) => pin !== undefined)
                    .map((pin: PinData, index: number) => (
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

                {/* User location */}
                {userLocation && (
                    <Marker position={userLocation} icon={redIcon} />
                )}

                {/* Show a marker immediately for the new pin if newPinData is set */}
                {newPinData && newPinData.position && (
                    <Marker position={newPinData.position} icon={customIcon} />
                )}
            </MapContainer>
            {/* Floating toggle button in bottom-left corner */}
            <Fab
                onClick={handleToggleAddPins}
                color={canAddPins ? "secondary" : "primary"}
                className="add-pin-button"
                sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    zIndex: 9999,
                }}
            >
                {canAddPins ? <CheckIcon /> : <AddIcon />}
            </Fab>

            {/* The shared Drawer for both "create" and "view" modes */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
            >
                <Box sx={{ width: 300, p: 2 }}>
                    {/* Header */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">
                            {drawerMode === "create" ? "Create New Pin" : "Pin Details"}
                        </Typography>
                        <IconButton onClick={closeDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* CONTENT: depends on drawerMode */}
                    {drawerMode === "create" && newPinData ? (
                        <>
                            <TextField
                                fullWidth
                                label="Title"
                                value={newPinData.title}
                                onChange={(e) => setNewPinData({ ...newPinData, title: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Text"
                                multiline
                                rows={4}
                                value={newPinData.text}
                                onChange={(e) => setNewPinData({ ...newPinData, text: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <Button variant="contained" onClick={handleSaveNewPin}>
                                Save Pin
                            </Button>
                        </>
                    ) : drawerMode === "view" && activePin ? (
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
                            <Button
                                variant="contained"
                                onClick={handleLike}
                                sx={{ mt: 2 }}
                            >
                                Like
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body2">No content to display.</Typography>
                    )}
                </Box>
            </Drawer>
        </>
    );
};


const ClickHandler = ({onMapClick,}: { onMapClick: (latlng: [number, number]) => void; }) => {
    useMapEvents({
        click: (e) => {
            onMapClick([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
};


const MoveEndHandler = ({onMoveEnd,}: { onMoveEnd: (latLng: [number, number]) => Promise<void>; }) => {
    const map = useMapEvents({
        moveend: async () => {
            const position = map.getCenter();
            await onMoveEnd([position.lat, position.lng]);
        },
    });
    return null;
};

export default MapPageRegistered;

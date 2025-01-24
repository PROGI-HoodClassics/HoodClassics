import {MapContainer, TileLayer, Marker, useMapEvents, useMap} from "react-leaflet";
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import { usePins } from "../context/PinContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Drawer, Box, Typography, IconButton, Popover, Chip, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redPinImage from "../assets/photos/red-pin.png";
import highlightedPin from "../assets/photos/pinHighlighted.png";


const API_BASE_URL = import.meta.env.VITE_BASE || 'http://localhost:8080'; 

const customHighlightedIcon = new L.Icon({
    iconUrl: highlightedPin,  
    iconSize: [25, 41],  
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

type PinData = {
    story_id?: string;
    position: [number, number];
    title?: string;
    text?: string;
    likes?: number;
};

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

    const [filteredStories, setFilteredStories] = useState<PinData[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const [tags, setTags] = useState([
        { id: '1', name: 'Sport' },
        { id: '2', name: 'Music' },
        { id: '3', name: 'Travel' },
        { id: '4', name: 'Food' },
        { id: '5', name: 'Art' },
    ]); 

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
        await updatePins(pins, [latLng[1], latLng[0]]);
    };
    const fetchStoriesByTags = async () => {
            if (!userLocation) return;
        
            const latitude = userLocation[0]; 
            const longitude = userLocation[1];
            const radius = 10; 
        
    
            const requestBody = {
                longitude: longitude.toString(),
                latitude: latitude.toString(),
                radius: radius,
                tags: selectedTags, 
            };
        
            try {
                const response = await fetch(`${API_BASE_URL}/api/story/taggedstories`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch stories.");
                }
        
                const data = await response.json();
                console.log("data:", data);
                setFilteredStories(data);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };
        
    
        const handleTagSelect = (tag: string) => {
            setSelectedTags((prevTags) => {
                const newTags = [...prevTags];
                const index = newTags.indexOf(tag);
                if (index > -1) {
                    newTags.splice(index, 1);
                } else {
                    newTags.push(tag);
                }
                return newTags;
            });
        };
        
    
        useEffect(() => {
            fetchStoriesByTags();
            console.log("Selected tags:", selectedTags);
        }, [selectedTags, userLocation]); 

        const handleOpenTags = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handleCloseTags = () => {
            setAnchorEl(null);
        };
    
        const openTags = Boolean(anchorEl);

    const handlePinClick = async (pin: any) => {
        console.log("PIN JE KLIKNUT" + pin.story_id);

        if (pin.story_id) {
            const fetchedPin = await fetchPin(pin.story_id);
            setActivePin(fetchedPin);
        } else {
            setActivePin(pin);
        }
        setDrawerOpen(true)
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setActivePin(null);
    };

    return (
        <>
            <MapContainer center={initialPosition} zoom={13} style={{ width: "100vw", height: "100vh" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <InitializeMap updatePins={updatePins} pins={pins} />
                <MoveEndHandler onMoveEnd={handleMoveEnd} />

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

         {filteredStories.map((story: any, index: number) => {
                    const pinData: PinData = {
                        story_id: story.story_id,
                        position: [story.latitude, story.longitude], 
                        likes: story.likes,
                    };
        
                    const isHighlighted = filteredStories.some(
                        (filteredStory) =>
                            filteredStory.latitude === story.latitude && 
                            filteredStory.longitude === story.longitude
                    );
        
                    const markerIcon = isHighlighted ? customHighlightedIcon : customIcon;
        
                    return (
                        <Marker
                            key={pinData.story_id || index}
                            position={pinData.position}
                            icon={markerIcon} 
                            eventHandlers={{
                                click: () => handlePinClick(pinData),
                            }}
                        />
                    );
                })}

                {userLocation && (
                    <Marker position={userLocation} icon={redIcon} />
                )}
            </MapContainer>


            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenTags}
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                }}
            >
                Show Tags
            </Button>

            <Popover
            open={openTags}
            anchorEl={anchorEl}
            onClose={handleCloseTags}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            sx={{
                "& .MuiPaper-root": {
                    borderRadius: "16px",
                    padding: "20px",
                    backgroundColor: "white",
                    marginTop: "-0.5rem",
                },
            }}
        >
            <Typography
                variant="h6"
                sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
            >
                Select a Tag
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 2,
                }}
            >
                {tags.map((tag) => (
                    <Chip
                        key={tag.id}
                        label={tag.name}
                        clickable
                        color={selectedTags.includes(tag.id) ? "secondary" : "primary"} 
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            borderRadius: "24px",
                            backgroundColor: selectedTags.includes(tag.id) ? "#1976d2" : "#e0f7fa", 
                            color: selectedTags.includes(tag.id) ? "white" : "black", 
                            "&:hover": {
                                backgroundColor: selectedTags.includes(tag.id) ? "#1565c0" : "#b2ebf2",
                            },
                        }}
                        onClick={() => handleTagSelect(tag.id)} 
                    />
                ))}
            </Box>
        </Popover>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={closeDrawer}
            >
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

const MoveEndHandler = ({onMoveEnd }: { onMoveEnd: (latLng: [number, number]) => Promise<void> }) => {
    const map = useMapEvents({
        moveend: async () => {
            const position = map.getCenter();
            await onMoveEnd([position.lat, position.lng]);
        },
    });
    return null;
};

const InitializeMap = ({ updatePins, pins }: { updatePins: Function; pins: any[] }) => {
    const map = useMap();
    const [hasUpdated, setHasUpdated] = useState(false); // Flag to prevent multiple updates

    useEffect(() => {
        if (!hasUpdated && map) {
            const center = map.getCenter();
            const latLng: [number, number] = [center.lat, center.lng];
            updatePins(pins, [latLng[1], latLng[0]]);
            setHasUpdated(true); // Set the flag to true after the first call
        }
    }, [hasUpdated, map, updatePins, pins]);

    return null;
};

export default MapPage;

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import HeaderRegistered from "../components/HeaderRegistered";
import { usePins } from "../context/PinContext";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Drawer, Box, Typography, IconButton, TextField, Button, Fab, Chip, Popover, FormControl, Select, MenuItem, InputLabel, Snackbar, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";


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
    iconSize: [41, 41],
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
    const { pins, addPin, updatePins, fetchPin, toggleLikePin, reportPin } = usePins();

    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const [filteredStories, setFilteredStories] = useState<PinData[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"create" | "view" | null>(null);

    const [activePin, setActivePin] = useState<PinData | null>(null);
    const [newPinData, setNewPinData] = useState<PinData | null>(null);
    const [canAddPins, setCanAddPins] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [reportCategory, setReportCategory] = useState<string>("");
    const [reportDescription, setReportDescription] = useState<string>("");
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [tags, setTags] = useState([
        { id: '1', name: 'Sport' },
        { id: '2', name: 'Music' },
        { id: '3', name: 'Travel' },
        { id: '4', name: 'Food' },
        { id: '5', name: 'Art' },
    ]); 

    const REPORT_OPTIONS = [
        "Neprimjeren sadržaj",
        "Netočan sadržaj",
    ];



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


    const fetchStoriesByTags = async () => {
        if (!userLocation) return;
    
        const { latitude, longitude } = userLocation;
        const radius = 5000; 
    

        const requestBody = {
            longitude: longitude.toString(),
            latitude: latitude.toString(),
            radius: radius,
            tagIds: selectedTags, 
        };
    
        try {
            const response = await fetch("/api/story/taggedstories", {
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
            setFilteredStories(data);
        } catch (error) {
            console.error("Error fetching stories:", error);
        }
    };
    

    const handleTagSelect = (tagId: string) => {
        setSelectedTags((prevTags) => {
            const newTags = [...prevTags];
            const index = newTags.indexOf(tagId);
            if (index > -1) {
                newTags.splice(index, 1);
            } else {
                newTags.push(tagId);
            }
            return newTags;
        });
    };
    

    useEffect(() => {
        fetchStoriesByTags();
    }, [selectedTags, userLocation]); 

    const handleOpenTags = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseTags = () => {
        setAnchorEl(null);
    };

    const openTags = Boolean(anchorEl);

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
        if (!newPinData.title || !newPinData.text) {
            alert("Please fill in both the title and text!");
            return;
        }
        await addPin(newPinData);

        setNewPinData(null);
        setDrawerOpen(false);
        setDrawerMode(null);
    };
    
    const handleToggleLike = async () => {
        if (!activePin?.story_id) return;
        const wasLiked = !!activePin.hasLiked;
        const result = await toggleLikePin(activePin.story_id);
        if (result) {
            setActivePin((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    likes: result.likes,
                    likedByCurrentUser: result.hasLiked,
                };
            });
            if (result.hasLiked && !wasLiked) {
                setSnackbarMessage("Liked");
            }  else {
                setSnackbarMessage("Unliked");
            }
            setSnackbarOpen(true);
        }
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
        setDrawerMode(null);
        setActivePin(null);
        setNewPinData(null);
    };

    const handleMoveEnd = async (latLng: [number, number]) => {
        await updatePins(pins, [latLng[1], latLng[0]]);
    };

    const handleReportSubmit = async () => {
        if (!activePin?.story_id || !reportCategory) {
            return;
        }

        const result = await reportPin(
            activePin.story_id,    // storyId
            reportCategory,        // category
            reportDescription      // description
        );

        if (!result) {
            console.error("Failed to send report. No response from server.");
            return;
        }

        console.log("Report result:", result.message);
        alert(`Report response: ${result.message}`);

        setReportCategory("");
        setReportDescription("");
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

                {filteredStories.map((story: PinData, index: number) => (
                            <Marker
                            key={story.story_id || index}
                            position={story.position}
                            icon={customIcon}
                            eventHandlers={{
                             click: () => handlePinClick(story),
                            }}
                        />
                     ))}


                {userLocation && (
                    <Marker position={userLocation} icon={redIcon} />
                )}

                {newPinData && newPinData.position && (
                    <Marker position={newPinData.position} icon={customIcon} />
                )}
            </MapContainer>

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
                <Box sx={{ width: 500, p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">
                            {drawerMode === "create" ? "Create New Pin" : "Pin Details"}
                        </Typography>
                        <IconButton onClick={closeDrawer}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

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
                            <IconButton
                                variant="contained"
                                onClick={handleToggleLike}
                                sx={{ mt: 2 }}
                            >
                                <FavoriteBorderTwoToneIcon/>
                            </IconButton>
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1">Report Story</Typography>
                                <FormControl fullWidth sx={{ mt: 1 }}>
                                    <InputLabel id="report-category-label">Report Category</InputLabel>
                                    <Select
                                        labelId="report-category-label"
                                        value={reportCategory}
                                        label="Report Category"
                                        onChange={(e) => setReportCategory(e.target.value)}
                                    >
                                        <MenuItem value="Neprimjeren sadrzaj">Neprimjeren sadrzaj</MenuItem>
                                        <MenuItem value="Netocan sadrzaj">Netocan sadrzaj</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Description (optional)"
                                    sx={{ mt: 2 }}
                                    value={reportDescription}
                                    onChange={(e) => setReportDescription(e.target.value)}
                                />

                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    disabled={!reportCategory}
                                    onClick={handleReportSubmit}
                                >
                                    Report
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2">No content to display.</Typography>
                    )}
                </Box>
            </Drawer>
            <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={3000}
                            onClose={() => setSnackbarOpen(false)}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <Alert severity="info" onClose={() => setSnackbarOpen(false)}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
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

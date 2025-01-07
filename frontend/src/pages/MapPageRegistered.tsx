import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import HeaderRegistered from "../components/HeaderRegistered";
import { usePins } from "../context/PinContext";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redPinImage from "../assets/photos/red-pin.png"; // Use your local red pin image

// Custom red pin icon for user location
const redIcon = new L.Icon({
    iconUrl: redPinImage,
    iconSize: [30, 41], // Adjusted size for the red pin
    iconAnchor: [15, 41], // Anchor at the bottom center
    popupAnchor: [0, -40], // Offset for the popup
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

const MapPageRegistered = () => {
    return (
        <>
            <HeaderRegistered />
            <div>Add Pins</div>
            <UserMap />
        </>
    );
};

const UserMap = () => {
    const initialPosition = [45.8004, 15.9714];
    const { pins, addPin } = usePins();
    const [tempPin, setTempPin] = useState<{ position: [number, number]; title: string; text: string } | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    // Get user's location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleMapClick = (latlng: [number, number]) => {
        setTempPin({ position: latlng, title: "", text: "" });
    };

    const saveTempPin = async () => {
        if (tempPin?.title && tempPin.text) {
            await addPin(tempPin);
            setTempPin(null);
        } else {
            alert("Please fill in both the title and text!");
        }
    };

    return (
        <MapContainer
            center={initialPosition}
            zoom={13}
            style={{ width: "100vw", height: "100vh" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <ClickHandler onMapClick={handleMapClick} />
            {pins.map((pin, index) => (
                <Marker key={pin.story_id || index} position={pin.position} icon={customIcon}>
                    <Popup>
                        <strong>{pin.title}</strong>
                        <p>{pin.text}</p>
                        <p>Likes: {pin.likes || 0}</p>
                    </Popup>
                </Marker>
            ))}
            {tempPin && (
                <Marker position={tempPin.position} icon={customIcon}>
                    <Popup
                        position={tempPin.position}
                        onClose={() => setTempPin(null)}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={tempPin.title}
                                onChange={(e) => setTempPin({ ...tempPin, title: e.target.value })}
                                style={{ width: "100%", marginBottom: "8px", backgroundColor: "white"}}
                            />
                            <textarea
                                placeholder="Text"
                                value={tempPin.text}
                                onChange={(e) => setTempPin({ ...tempPin, text: e.target.value })}
                                style={{ width: "100%", backgroundColor: "white" }}
                            />
                            <button onClick={saveTempPin} style={{ marginTop: "8px" }}>
                                Save
                            </button>
                        </div>
                    </Popup>
                </Marker>
            )}
            {userLocation && (
                <Marker position={userLocation} icon={redIcon}>
                    <Popup>
                        <strong>Your Location</strong>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

const ClickHandler = ({ onMapClick }: { onMapClick: (latlng: [number, number]) => void }) => {
    useMapEvents({
        click: (e) => {
            const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
            onMapClick(latlng);
        },
    });

    return null;
};

export default MapPageRegistered;

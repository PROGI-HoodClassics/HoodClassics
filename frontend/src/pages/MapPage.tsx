import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useState, useEffect} from 'react';
import Header from "../components/Header";
import {usePins} from "../context/PinContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import redPinImage from "../assets/photos/red-pin.png";

const MapPage = () => {
    return (
        <>
            <Header/>
            <div>View Pins</div>
            <UserMap/>
        </>
    );
};
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


const UserMap = () => {
    const initialPosition = [45.8004, 15.9714];
    const {pins,updatePins, fetchPin} = usePins();
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    updatePins(pins,  [position.coords.longitude,position.coords.latitude]);

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
    }


    return (
        <MapContainer center={initialPosition} zoom={13} style={{width: "100vw", height: "100vh"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <MoveEndHandler onMoveEnd={handleMoveEnd}/>
            {pins.filter((pin) => {
                return pin != undefined
            }).map((pin, index) => (
                <Marker key={pin.story_id || index} position={pin.position} icon={customIcon} eventHandlers={{
                    click: () => fetchPin(pin.story_id || ''),
                }}>
                    <Popup>
                        <strong>{pin.title}</strong>
                        <p>{pin.text}</p>
                        <p>Likes: {pin.likes || 0}</p>
                    </Popup>
                </Marker>
            ))}
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
const MoveEndHandler = ({onMoveEnd}: { onMoveEnd: (latLng: [number, number]) => Promise<void> }) => {
    const map = useMapEvents({
        moveend: async () => {
            const position = map.getCenter();
//            const zoom = map.getZoom();
            await onMoveEnd([position.lat, position.lng])
        },
    });
    return null;
};

export default MapPage;

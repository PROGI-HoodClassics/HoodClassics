import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Header from "../components/Header";
import { usePins } from "../context/PinContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapPage = () => {
  return (
      <>
        <Header />
        <div>View Pins</div>
        <UserMap />
      </>
  );
};

const UserMap = () => {
  const initialPosition = [45.8004, 15.9714];
  const { pins } = usePins();

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
      <MapContainer center={initialPosition} zoom={13} style={{ width: "100vw", height: "100vh" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        {pins.map((pin, index) => (
            <Marker key={pin.story_id || index} position={pin.position} icon={customIcon}>
              <Popup>
                <strong>{pin.title}</strong>
                <p>{pin.text}</p>
                <p>Likes: {pin.likes || 0}</p>
              </Popup>
            </Marker>
        ))}
      </MapContainer>
  );
};

export default MapPage;

import HeaderRegistered from '../components/HeaderRegistered';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png'; 
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const MapPageRegistered = () => {
  return (
    <>
      <HeaderRegistered/>
      <div>MapPage</div>
      <UserMap/>
    </>
  );
};

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();
  const defaultPosition = [37.7749, -122.4194];

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      setPosition(defaultPosition); 
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        map.setView([latitude, longitude], 13); 
      },
      (err) => {
        console.error(err);
        setPosition(defaultPosition);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId); 
  }, [map]);


  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41], 
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here!</Popup>
    </Marker>
  ) : null;
};

const UserMap = () => {
  const initialPosition = [45.8004, 15.9714];

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={13} 
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};


export default MapPageRegistered;

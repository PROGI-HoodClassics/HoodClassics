import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HeaderRegistered from '../components/HeaderRegistered';

const MapPageRegistered = () => {
  return (
    <>
      <HeaderRegistered />
      <div>MapPage</div>
      <Map />
    </>
  );
};

const Map = () => {
  const position = [37.7749, -122.4194];

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ width: '100vw', height: '80vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Center of the map</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapPageRegistered;

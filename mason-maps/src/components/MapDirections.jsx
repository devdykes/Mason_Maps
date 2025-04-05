import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%' // fill .map-container
};

const fallbackCenter = {
  lat: 38.8305, // GMU fallback
  lng: -77.3070
};

const MapDirections = ({ target }) => {
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);

  // 🌎 Get user geolocation once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setOrigin({ lat: latitude, lng: longitude });
        console.log("User location:", latitude, longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to get your current location.");
        setOrigin(fallbackCenter);
      }
    );
  }, []);

  // 🧭 Generate route when both locations are available
  useEffect(() => {
    if (origin && target) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination: target,
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error("Directions request failed:", status);
            setDirections(null);
          }
        }
      );
    }
  }, [origin, target]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuFtafeZFSxUruU-nLvUSnRo3TXbGpIW0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={target || origin || fallbackCenter}
        zoom={15}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDirections;


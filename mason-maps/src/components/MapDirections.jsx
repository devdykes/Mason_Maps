import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 38.875,
  lng: -77.27
};

const origin = { lat: 38.833423, lng: -77.306465 }; 
const destination = { lat: 38.829418, lng: -77.307644 };

const MapDirections = () => {
  const [directions, setDirections] = useState(null);

  const handleMapLoad = (map) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Error fetching directions:', status);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuFtafeZFSxUruU-nLvUSnRo3TXbGpIW0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={handleMapLoad}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDirections;
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 38.875,
  lng: -77.27
};

const MapDirections = () => {

  const [color, setColor] = useState('lightblue');

  React.useEffect(() => {
    document.body.style.backgroundColor = color;
    const intervalId = setInterval(() => {
      setColor((prevColor) => (prevColor === 'lightblue'));
    }, 0);
    return () => clearInterval(intervalId);
  }, [color]);
  
  const [directions, setDirections] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrLocation({ latitude, longitude });
        console.log('Latitude:', latitude, 'Longitude:', longitude);
      },
      (error) => {
        console.error('Error fetching geolocation:', error);
        alert('Error fetching geolocation');
      }
    );
  };

  useEffect(() => {
    if (currLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: currLocation.latitude, lng: currLocation.longitude },
          destination: { lat: 38.829418, lng: -77.307644 },
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
    }
  }, [currLocation]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBuFtafeZFSxUruU-nLvUSnRo3TXbGpIW0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDirections;
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'
import { useDriverContext } from '../../context/DriverHook';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -22.904650,
  lng: -43.190732,
};

const SimpleMap: React.FC = () => {
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const { state } = useDriverContext();
  
  const origin = state.start_location ; 
  const destination = state.end_location;
  
  const handleDirectionsCallback = (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === 'OK' && response) {
      setDirectionsResponse(response);
      
    } else {
      console.error('Erro ao calcular rota:', status);
    }
  };
  useEffect(() => {
    if (origin && destination) {
      setDirectionsResponse(null);  
    }

  }, [origin, destination]);

  
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY || ''}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Serviço para calcular a rota */}
        <DirectionsService options={{
            origin: `${origin}`,
            destination:  `${destination}`,
            travelMode: "DRIVING" as google.maps.TravelMode.DRIVING,
          }}
          callback={handleDirectionsCallback}
        />
        {/* Renderização da rota no mapa */}
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default SimpleMap;

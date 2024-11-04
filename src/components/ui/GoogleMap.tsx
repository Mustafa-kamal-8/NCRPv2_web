import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

interface TLocation {
  lat: number;
  lng: number;
}

interface GoogleMapProps {
  containerStyle: React.CSSProperties;
  positions: TLocation[];
}



function GoogleMapComponent({ containerStyle, positions }: GoogleMapProps) {

  return (
    <LoadScript googleMapsApiKey={ import.meta.env.VITE_GOOGLE_MAPS_API_KEY }>
      <GoogleMap
        mapContainerStyle={ containerStyle }
        center={ positions[0] }
        zoom={ 4 }
      >
        { positions.map((position, index) => (
          <MarkerF key={ index } position={ position } />
        )) }
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;

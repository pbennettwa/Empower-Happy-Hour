import React from "react"
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from "@react-google-maps/api"
import google from '../../data/google'


const mapContainerStyle = {
  height: "750px",
  width: "1000px"
};

const options = {
  imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
};

const Map = ({ startPosition, position, bars, setPositionMarker }) => {
  const [map, setMap] = React.useState(null);
  const center = { lat: position[0], lng: position[1] };
  const locations = [{ lat: startPosition[0], lng: startPosition[1] }];
  bars.forEach(bar => {
    locations.push({ lat: bar.venue.location.lat, lng: bar.venue.location.lng});
  });
  return (
    <LoadScript googleMapsApiKey={google}>
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
      >
        <MarkerClusterer
          options={options}
          zoom={14}
        >
          {
            (clusterer) => locations.map((location, i) => (
              <Marker
                key={i}
                position={location}
                clusterer={clusterer}
                value={location}
                onClick={setPositionMarker}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
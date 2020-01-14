import React from "react"
import { GoogleMap, LoadScript, MarkerClusterer, Marker, InfoBox } from "@react-google-maps/api"
import google from '../../data/google'


const mapContainerStyle = {
  height: "750px",
  width: "1000px"
};

const options = {
  imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
};

const onLoad = infoBox => {
  // console.log('infoBox: ', infoBox)
};

const Map = ({ startPosition, position, bars, setPositionMarker, currentName }) => {
  const [map, setMap] = React.useState(null);
  const startCenter = { lat: startPosition[0], lng: startPosition[1] };
  const center = { lat: position[0], lng: position[1] };
  const locations = [{ lat: startPosition[0], lng: startPosition[1] }];
  bars.forEach(bar => {
    locations.push({ lat: bar.venue.location.lat, lng: bar.venue.location.lng });
  });

  if (startCenter.lat === center.lat && startCenter.lng === center.lng) {
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
                />
              ))
            }
          </MarkerClusterer>
          <InfoBox
            onLoad={onLoad}
            options={options}
            position={startCenter}
          >
            <div style={{ backgroundColor: 'white', opacity: 0.75, padding: 12 }}>
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                You are here.
        </div>
            </div>
          </InfoBox>
        </GoogleMap>
      </LoadScript>
    )
  } else {
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
                />
              ))
            }
          </MarkerClusterer>
          <InfoBox
            onLoad={onLoad}
            options={options}
            position={startCenter}
          >
            <div className="info-one" style={{ backgroundColor: 'white', opacity: 0.75, padding: 12 }}>
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                You are here.
        </div>
            </div>
          </InfoBox>
          <InfoBox
            onLoad={onLoad}
            options={options}
            position={center}
          >
            <div className="info-one" style={{ backgroundColor: 'white', opacity: 0.75, padding: 12 }}>
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                {currentName}
        </div>
            </div>
          </InfoBox>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default Map
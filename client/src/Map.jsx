import React from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import google from '../../data/google'

// lat and lng are float numbers not string
const lat = 47.5991664;
const lng = -122.3331533;

const Map = props => {
  const [map, setMap] = React.useState(null)
  return (
    <LoadScript googleMapsApiKey={google}>
      <GoogleMap className="google-map"
        // set the state with the current instance of map.
        onLoad={map => {
          setMap(map)
        }}
        mapContainerStyle={{
          height: "750px",
          width: "1000px",
        }}
        zoom={16}
        center={{
          lat: lat,
          lng: lng,
        }}
        id="example-map"
        // here onZoomChanged we are accessing the current zoom value from our map
      >
        ...Your map components
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
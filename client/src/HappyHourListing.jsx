import React from 'react';
import getDistance from 'geolib/es/getDistance';

const HappyHourListing = ({ bar, setPosition, searchResults }) => {
  return (
    <div className='listing'>
      <h4 className='name' onClick={setPosition} value={[bar.venue.location.lat, bar.venue.location.lng]}>{bar.venue.name}</h4>
      <h5 className='type'> - {bar.venue.categories[0].name}</h5>
      <h6 className='location' value={bar.venue.name} onClick={searchResults}>{bar.venue.location.formattedAddress[0]}</h6>
      <p className='distance' value={bar.venue.name} onClick={searchResults}>{(getDistance({ latitude:47.5991664, longitude:-122.3331533 }, { latitude:bar.venue.location.lat, longitude:bar.venue.location.lng })/1609).toFixed(2)} miles away</p>
    </div>
  )
}

// { latitude:47.5991664, longitude:-122.3331533 }

export default HappyHourListing;
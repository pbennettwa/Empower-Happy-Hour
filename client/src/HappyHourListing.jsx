import React from 'react';
import getDistance from 'geolib/es/getDistance';

const HappyHourListing = ({ bar }) => {
  return (
    <div className='listing'>
      <h4 className='name'>{bar.venue.name}</h4>
      <h6 className='type'> - {bar.venue.categories[0].name}</h6>
      <p>{(getDistance({ latitude:47.5991664, longitude:-122.3331533 }, { latitude:bar.venue.location.lat, longitude:bar.venue.location.lng })/1609).toFixed(2)} miles away</p>
    </div>
  )
}

// { latitude:47.5991664, longitude:-122.3331533 }

export default HappyHourListing;
import React from 'react';
import HappyHourListing from './HappyHourListing'

const HappyHourList = ({ bars, setPosition, searchResults }) => {
  return (
    <div>
      <h2 className='open'>Bars Currently Open</h2>
      <div className='list'>
        {bars.map(bar => {
          return <HappyHourListing key={bar.venue.name} bar={bar} setPosition={setPosition} searchResults={searchResults} />
        })}
      </div>
    </div>
  )
}

export default HappyHourList;
import React, { Component } from 'react';
import axios from 'axios';
import getDistance from 'geolib/es/getDistance';
import { geolocated } from "react-geolocated";
import HappyHourList from './HappyHourList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: []
    };
  }

  componentDidMount() {
    axios.get('/bars/seattle, WA')
    .then(response => {
      const allBars = response.data.sort((a, b) => {
        return (getDistance({ latitude:47.5991664, longitude:-122.3331533 }, { latitude:a.venue.location.lat, longitude:a.venue.location.lng })/1609) - (getDistance({ latitude:47.5991664, longitude:-122.3331533 }, { latitude:b.venue.location.lat, longitude:b.venue.location.lng })/1609)
      })
      // console.log(allBars)
        this.setState({
          bars: allBars,
        });
      });
  }

  render() {
    return (
      <div>
        <h1 className='title'>Empower Happy Hour</h1>
      <div>
        <HappyHourList bars={this.state.bars} />
      </div>
      </div>
		);
	}
}

export default App;
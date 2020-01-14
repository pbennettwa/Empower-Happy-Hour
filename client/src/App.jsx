import React, { Component } from 'react';
import axios from 'axios';
import google from '../../data/google';
import getDistance from 'geolib/es/getDistance';
import HappyHourList from './HappyHourList';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      position: [47.5991664, -122.3331533]
    };
  }

  componentDidMount() {
    axios.get('/bars/seattle, WA')
      .then(response => {
        const allBars = response.data.sort((a, b) => {
          return (getDistance({ latitude: 47.5991664, longitude: -122.3331533 }, { latitude: a.venue.location.lat, longitude: a.venue.location.lng }) / 1609) - (getDistance({ latitude: 47.5991664, longitude: -122.3331533 }, { latitude: b.venue.location.lat, longitude: b.venue.location.lng }) / 1609)
        })
        this.setState({
          bars: allBars,
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <h1 className='title'>Empower Happy Hour</h1>
        <div className='container'>
          <HappyHourList bars={this.state.bars} className='right' />
          <div className='map'>
            <Map position={this.state.position} />
          </div>
        </div >
      </div >
    );
  }
}

export default App;
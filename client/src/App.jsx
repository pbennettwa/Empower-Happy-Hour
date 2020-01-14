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
      startPosition: [47.5991664, -122.3331533],
      position: [47.5991664, -122.3331533]
    };

    this.setPositionMarker = this.setPositionMarker(this);
    this.setPosition = this.setPosition.bind(this);
    this.searchResults = this.searchResults.bind(this);
  }

  componentDidMount() {
    axios.get('/bars/seattle')
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

  setPosition(event) {
    const currentLocation = event.target.attributes[1].value.split(',')
    currentLocation[0] = JSON.parse(currentLocation[0]);
    currentLocation[1] = JSON.parse(currentLocation[1]);
    this.setState({
      position: currentLocation
    })
  }

  setPositionMarker(event) {
    // console.dir(event)
  }

  searchResults(event) {
    let currentBar = `${event.target.attributes[1].value} happy hour`;
    currentBar = currentBar.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s+/g, '+');
    window.open(`http://www.google.com/search?q=${currentBar}`, '_blank')
  }

  render() {
    return (
      <div>
        <h1 className='title'>Empower Happy Hour</h1>
        <div className='container'>
          <HappyHourList className='right' bars={this.state.bars} setPosition={this.setPosition} searchResults={this.searchResults} />
          <div className='map'>
            <Map position={this.state.position} startPosition={this.state.startPosition} bars={this.state.bars} setPositionMarker={this.setPositionMarker} />
          </div>
        </div >
      </div >
    );
  }
}

export default App;
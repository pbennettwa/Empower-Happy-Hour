import React, { Component } from 'react';
import axios from 'axios';
import google from '../../data/google';
import getDistance from 'geolib/es/getDistance';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import HappyHourList from './HappyHourList';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      position: [[47.5991664, -122.3331533]]
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
        <HappyHourList bars={this.state.bars} />
        <div id="mapid"></div>
        <div className='mapid'>
          <Map center={this.state.position[0]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {this.state.position.map((position, idx) =>
              <Marker key={`marker-${idx}`} position={position}>
                <Popup>
                  <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                </Popup>
              </Marker>
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
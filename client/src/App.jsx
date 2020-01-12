import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/?location=seattle").then(response => {
        console.log(response);
      })
  }


  render() {
    return (
      <div>
        Hello!
      </div>
		);
	}
}

export default App;
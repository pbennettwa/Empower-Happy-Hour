const express = require('express');
const axios = require('axios');
const foursquare = require('../data/foursquare.js');
// const yelp = require('yelp-fusion');
// const yelpAPI = require('../data/yelpAPIKey.js')

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const client = yelp.client(yelpAPI.key);

app.get('/bars/:location', (req, res) => {
  const { location } = req.params.location;
  axios.get(`https://api.foursquare.com/v2/search/recommendations?ll=47.5991664, -122.3331533&intent=drinks&features=15&openNow=true&limit=50&client_id=${foursquare.client}&client_secret=${foursquare.secret}&v=20200113`)
    .then(function (response) {
      // handle success
      res.status(200).send(response.data.response.group.results);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.status(400).send();
    })
});

app.listen(port);

module.exports.app = app;

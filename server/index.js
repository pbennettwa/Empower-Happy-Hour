const express = require('express');
const axios = require('axios');
const foursquare = require('../data/foursquare');
// const reverse = require('reverse-geocode')
const Model = require('./db/index')

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/bars/:location', (req, res) => {
  const city = req.params.location;
  // const currentCity = reverse.lookup(location, 'us');
  axios.get(`https://api.foursquare.com/v2/search/recommendations?ll=47.5991664, -122.3331533&intent=drinks&features=15&openNow=true&limit=50&client_id=${foursquare.client}&client_secret=${foursquare.secret}&v=20200113`)
    .then(function (response) {
      var query = { area: city };
      var information = response.data.response.group.results
      Model.findOneAndUpdate(query, { area: city, info:information }, { upsert: true })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
      res.status(200).send(information);
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).send();
    })
});

app.listen(port);

module.exports.app = app;

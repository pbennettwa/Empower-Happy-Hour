const express = require('express');
const Model = require('../db/model.js');
const yelp = require('yelp-fusion');
const yelpAPI - require('../../data/yelpAPIKey.js')

const app = express();
const port = 3002;

app.use(express.static(`${__dirname}/../public/dist`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = yelp.client(yelpAPI.key);

app.get('/:location', (req, res) => {
  const {location} = req.params.id
  client.search({
    term:'Happy Hour',
    location: location
  }).then(response => {
    // const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettresponse.jsonBodyyJson);
    res.send(response.jsonBody.businesses)
  }).catch(err => {
    console.log(err);
  });
});

app.listen(port);

module.exports.app = app;

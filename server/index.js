const express = require('express');
const yelp = require('yelp-fusion');
const yelpAPI = require('../data/yelpAPIKey.js')

const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = yelp.client(yelpAPI.key);

app.get('/:location', (req, res) => {
  const { location } = req.params.location;
  client.search({
    term: 'bars',
    location: 'Seattle',
  }).then(response => {
    const businesses = JSON.parse(response.body)
    console.log(businesses.businesses);
    res.send(businesses.businesses)
  }).catch(err => {
    console.log(err);
  });
});

app.listen(port);

module.exports.app = app;

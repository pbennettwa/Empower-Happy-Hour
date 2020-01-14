var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/happyHour', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var locationSchema = new mongoose.Schema({
  area: String
}, { strict: false });

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;
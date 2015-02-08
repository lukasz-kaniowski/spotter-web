var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var Writable = require('stream').Writable;
var Location = require('./location.model');


var geocoderProvider = 'google';
var httpAdapter = 'http';

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);

var parser = parse({delimiter: ','});

var geocoding = transform(function (record, callback) {
  console.log(record);
  //0 , 1    , 2           , 3
  //np, nazwa, kod pocztowy, ul
  var address ={address: record[3], country: 'Poland', zipcode: record[2]};

  geocoder.geocode(address, function (err, res) {
    console.log(err, res);
    callback(null, {
      csv: {
        id: record[0],
        name: record[1],
        zipcode: record[2],
        street: record[3],
        city: record[4]
      },
      geoData: res
    });
  });
}, {parallel: 10});

var saveToDb = Writable({ objectMode: true });
saveToDb._write = function (location, enc, next) {
  Location.create(location, next);
};


exports.geocode = function (file) {
  var input = fs.createReadStream(file);
  console.log(input);

  input
    .pipe(parser)
    .pipe(geocoding)
    .pipe(saveToDb);
};

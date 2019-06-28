require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

 
var spotify = new Spotify({
  id: <b7cc374412f442fb95acb7d20ad572d3>,
  secret: <b27c83425d394f789ed8fda5a1542322>
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
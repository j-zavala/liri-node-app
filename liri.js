// using .env to hide keys
require("dotenv").config();

// project variables
let keys = require('./keys.js');
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let fs = require('fs');
let SpotifyAPI = require('node-spotify-api');
let request = require('request');
let twiiter = require('twitter')





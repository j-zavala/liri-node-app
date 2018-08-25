// using .env to hide keys
require("dotenv").config();

// project variables
let keys = require('./keys.js');
let SpotifyAPI = require('node-spotify-api');
let request = require('request');
let Twitter = require('twitter');
let fs = require('fs');
let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let command = process.argv[2];

let getTweets = function(username) {
    // Display last 20 tweets;
    let screenName = {screen_name: username};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response) {

        // console.log("tweets: ", tweets);
        
        if (!error) {
            for (let i=0; i<tweets.length; i++) {
                let date = tweets[i].created_at;
                let string = "\n@JohnSte78206501: " + tweets[i].text + "\nCreated at: " + date.substring(0, 19);
                let divider = "\n------------------------------------------------";
                console.log(string);
                console.log(divider);

                //adds text to log file
                fs.appendFile('log.txt', string, 'utf8', function(err) {
                    if(err) {
                        throw(err);
                    }
                });
                fs.appendFile('log.txt', divider, 'utf8', function(err){
                    if(err) {
                        throw(err);
                    }
                });
            }
        } else {
            console.log('Error occurred');
        }
    });
};

function spotifySong(song) {
    spotify.search({type: 'track', query: 'song'}, function(error, data) {
        console.log(JSON.parse(data));
    })
}


// getTweets("JohnSte78206501");
spotifySong("You got the love");

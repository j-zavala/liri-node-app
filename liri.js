// using .env to hide keys
require("dotenv").config();

// project variables
let keys = require('./keys.js');
let Spotify = require('node-spotify-api');
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

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        for (let i=0; i<data.tracks.items.length; i++) {
            let songData = data.tracks.items[i];
            let artist = "Artist: " + songData.artists[0].name;
            let song = "Song: " + songData.name;
            let link = "Preview URL: " + songData.preview_url;
            let album = "Album: " + songData.album.name;
            let divider = "------------------------------------------------"
            //get artist
            console.log(artist);
            // get song name
            console.log(song);
            //get spotify preview link
            console.log(link);
            //get album name
            console.log(album);
            console.log(divider);

            // adds text to log.txt
            fs.appendFile('log.txt', "\n"  + artist + "\n", 'utf8', function(err) {
                if (err) {
                    throw(err);
                }
            });
            fs.appendFile('log.txt', song + "\n", 'utf8', function(err) {
                if (err) {
                    throw(err);
                }
            });
            fs.appendFile('log.txt', link + "\n", 'utf8', function(err) {
                if (err) {
                    throw(err);
                }
            });
            fs.appendFile('log.txt', album + "\n", 'utf8', function(err) {
                if (err) {
                    throw(err);
                }
            });
            fs.appendFile('log.txt', divider, 'utf8', function(err) {
                if (err) {
                    throw(err);
                }
            });
        }
        
      });
}



// function spotifySong(song) {
//     spotify.search({type: 'track', query: 'song'}, function(error, data) {
//         console.log(JSON.parse(data));
//     })
// }


// getTweets("JohnSte78206501");
spotifySong('All the Small Things');

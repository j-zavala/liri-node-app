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
let x = "";

//switch case
switch(command) {
    case "my-tweets":
        if(x) {
            getTweets(x);
        }
        else {
            getTweets("JohnSte78206501");
        }
    break;

    case "spotify-this-song":
        if(x) {
            getSong(x);
        } else {
            getSong("All the Small Things");
        }
    break;

    case "movie-this":
        if(x) {
            omdbData(x);
        } else {
            omdbData("Transformers");
        }
    break;

    case "do-what-it-says":
        doThing();
    break;

    default: 
        console.log("Please enter one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says")
}




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

function getSong(song) {

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

function omdbData(movie){
    let apikey = "88f0fe15";
    let omdbURL = "http://www.omdbapi.com/?i=tt3896198&apikey=" + apikey +  "&t=" + movie + '&plot=short&tomatoes=true';
  
    request(omdbURL, function (error, response, body1){
      if(!error && response.statusCode == 200){
        let body = JSON.parse(body1);
        let title = "Title: " + body.Title;
        let year = "Release Year: " + body.Year;
        let rating = "IMdB Rating: " + body.imdbRating;
        let country = "Country: " + body.Country;
        let language = "Language: " + body.Language;
        let plot = "Plot: " + body.Plot;
        let actors = "Actors: " + body.Actors;
        let rtRating = "Rotten Tomatoes Rating: " + body.tomatoRating;
        let rtURL = "Rotten Tomatoes URL: " + body.tomatoURL;

        console.log(title);
        console.log(year);
        console.log(rating);
        console.log(country);
        console.log(language);
        console.log(plot);
        console.log(actors);
        console.log(rtRating);
        console.log(rtURL);
  
        // adds text to log.txt
        fs.appendFile('log.txt', "\n" +title + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', year + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', rating + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', country + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', language + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', plot + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', actors + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', rtRating + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
        fs.appendFile('log.txt', rtURL + "\n", 'utf8', function(err) {
            if(err) {
                throw(err);
            }
        });
  
      } else {
        console.log('Error occurred.')
      }
    });
  
  }

  function doThing () {
      fs.readFile('random.txt', "utf8", function(error, data) {
          let txt = data.split(',')

          getSong(txt[1]);
      });
  }



// getTweets("JohnSte78206501");
// getSong('All the Small Things');
// omdbData("transformers");

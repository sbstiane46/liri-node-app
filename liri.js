require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
// var axios = require("axios");
// var moment = require("moment");
// var fs = require("fs");

// questions for user
inquirer.prompt([{
        type: "list",
        name: "userInput",
        message: "which artist or song?",
        choose: ["spotify-this-song"]
    }])

    // spotify search
    .then(function(result) {
            if (result.userInput === "spotify-this-song") {
                inquirer.prompt([{
                    type: "input",
                    name: "songName",
                    message: "search for song?"

                }]).then(function(nextQuestion) {
                    console.log(nextQuestion.songName);

                    var songName = nextQuestion.songName;
                    //
                    if (nextQuestion.songName === "") {
                        songName = "Bohemian Rapsody"
                    }
                    //
                    spotify.search({
                        type: 'track',
                        query: songName
                    }, function(err, response) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        // response data
                        for (var i = 0; i < response.tracks.items.length; i++) {
                            var artistName = response.tracks.items[i].artist[0].name;
                            var albumName = response.tracks.items[i].name;
                            var albumSong = response.tracks.items[i].album.album_type;
                            var previewLink = response.tracks.items[i].preview_url;

                            console.log("*************************************************");
                            console.log("Artist Name:" + artistName);
                            console.log("Album Name:" + albumName);
                            console.log("The Album song is from : " + albumSong);
                            console.log("Preview link: " + previewLink);
                            console.log("******************************************************");

                        }
                    })
                })
            }
        })
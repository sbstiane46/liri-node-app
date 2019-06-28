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
                    message: "search for a song!"

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
                    }, function (err, response) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        // response data
                        for (var i = 0; i < response.tracks.items.length; i++) {
                            var artistName = response.tracks.items[i].artist[0].name;
                            var albumName = response.tracks.items[i].name;
                            var previewLink = response.tracks.items[i].preview_url;

                            console.log("*************************************************");
                            console.log("Artist:" + artistName);
                            console.log("Album:" + albumName);
                            console.log("Preview link: " + previewLink);
                            console.log("******************************************************");

                        }
                    })
                })
            }
        })
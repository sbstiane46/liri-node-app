require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new spotify(keys.spotify);

// API keys...
var songName;

start_liri();

function start_liri() {

// questions for user
    inquirer.prompt([
        {
            type: "list",
            name: "userInput",
            message: "what do you want to search for?",
            choose: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
        }])

    
    .then(function(result) {

        append_log("*********** USER REQUEST - "  + moment().format("MM/DD/YYYY, h:mm:ss a ") + "***********");
        // append_log("USER REQUEST: + response.action");
        
            if (result.userInput === "spotify-this-node") {
                inquirer.prompt([{
                    type: "input",
                    name: "songName",
                    message: "search for a song!"

                }]).then(function(Question) {
                    console.log(userInput.songName);

                    var songName = userInput.songName;
                    //
                    if (userInput.songName === "") {
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
        }
require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new spotify(keys.spotify);

var bandsInTownKey = keys.bandsInTown.id;
var omdbAPIkey = keys.omdb.id;

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

    
    .then(function(Q1response) {

        append_log("*********** USER REQUEST - "  + moment().format("MM/DD/YYYY, h:mm:ss a ") + "***********");
        append_log("USER REQUEST: + Q1response.userInput");
        
            if (Q1response.userInput != "do-what-it-says") {
                inquirer.prompt([{
                    type: "input",
                    name: "search-this",
                    message: "search for what?"

                }]).then(function(Q2response) {
                    append_log("USER SEARCH: " + Q2response["search-for"]);

                    switch(Q4response.userInput) {
                        case "concert-this": 
                        search_concerts(Q2response["search-what"]);
                        break;
                    case "movie-this":
                        search_movies(Q2response["search-what"]);
                        break;
                    case "spotify-this":
                        search_songs(Q2response["search-what"]);
                        break;
                    }

                })
            } else {
                console.log("You get this");

                fs.readFile("random.txt" , "uft8", function (error, data) {
                    if (error) {
                        console.log(error);
                    }
                })
            }
        })
    }

    function search_concerts(bandName) {

        axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + bandsInTownKey).then(
            function (response) {
                console.log(response.data)

                for(var i =0; i < response.data.length; i++) {
                    let header = "***** EVENTS *****"
                    let artist = "ARTIST: " + bandName.bandName();
                    let dt = "DATE: " + moment(response.data[i].dateTime).format("MM/DD/YYYY");
                    let venue  = "VENUE: " + response.data[i].venue.location;
                    let city = "CITY " + response.data[i].venue.city;
                    let country = "COUNTRY " + response.data[i].venue.country;

                    console.log(header);
                    console.log(artist);
                    console.log(dt);
                    console.log(location);
                    console.log(city);
                    console.log(country); 
                    append_log(header);
                    append_log(artist);
                    append_log(dt);
                    append_log(location);
                    append_log(city);
                    append_log(country);
                }

                console.log(" ");
                setTimeout(start_liri, 2000);

            })
            .catch(function (error) {
                if (error.response) {
                    console.log("oops, something went wrong");
                }
            })

            
    }

    function search_movies(movieName) {
        if(movieName === "") {
            movieName = "Avatar";
            let recommendation = "Do you like sci-fi?";
            console.log(" ");
            console.log(recommendation);
            console.log(" ");
            append_log(recommendation);
        }
        axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdbAPIkey).then(
            function (response) {
                if (response.data.Response === "Opps") {
                    console.log(response.data.Error)
                    append_log(response.data.Error)
                    console.log("");
                    setTimeout(start_liri, 2000);
                    return
                }

            var rottenTomatoes = "";
            for(var i = 0; i < response.data.Ratings.length; i++) {
                if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                    rottenTomatoes = response.data.Ratings[i].Value;
                }
            }
            let header = "***** MOVIE *****";
            let title = "TITLE:           " + response.data.Title;
            let release = "RELEASE:         " + response.data.Year;
            let imdb = "IMDB RATING:     " + response.data.imdbRating;
            let rated = "RATED:           " + response.data.Rated;
            let tomatoes = "ROTTEN TOMATOES: " + Rotten;
            let country = "COUNTRY:         " + response.data.Country;
            let language = "LANGUAGE:        " + response.data.Language;
            let plot = "PLOT:            " + response.data.Plot;
            let actors = "ACTORS:          " + response.data.Actors;

            console.log(header);
            console.log(title);
            console.log(release);
            console.log(imdb);
            console.log(rated);
            console.log(tomatoes);
            console.log(country);
            console.log(language);
            console.log(plot);
            console.log(actors);
            append_log(header);
            append_log(title);
            append_log(release);
            append_log(imdb);
            append_log(rated);
            append_log(tomatoes);
            append_log(country);
            append_log(language);
            append_log(plot);
            append_log(actors);

            console.log(" ");
            append_log(start_liri, 2000);
            }
            .catch(function (error) {
                if (error.response) {
                    console.log("oops, something went wrong");
                }
            })
        )
    }

    function search_songs(songName) {
        if (songName === "") {
            songName = "Bohemian Rapsody";
        }
        spotify.search({ type: 'track', query: songName }, function (err, data) {
            if (err) {return console.log('Error occurred: ' + err);}
            for (var i = 0; i < data.tracks.items.length; i++) {

                let header = "***** SONG *****";
                let track = "NAME: " + data.tracks.items[i].name;
                let artist = "ARTIST: " + data.tracks.items[i].artist[0].name;
                let album = "ALBUM: " + data.tracks.items[i].album.name;
                let release = "RELEASE: " + data.tracks.items[i].album.release_date;
                let preview = "PREVIEW: " + data.tracks.items[i].external_urls.spotify;

                console.log(header);
                console.log(track);
                console.log(artist);
                console.log(album);
                console.log(release);
                console.log(preview);
                console.log("");
                append_log(header);
                append_log(track);
                append_log(artist);
                append_log(album);
                append_log(release);
                append_log(preview);

                console.log("");
                setTimeout(start_liri, 2000);
            }
        });
    }
    function append_log(appendText){
        fs.appendFileSync("log.txt", appendText + "\n");
    }

//     let header = "********** SONG **********";
//     let track = "NAME:    " + data.tracks.items[i].name;
//     let artist = "ARTIST:  " + data.tracks.items[i].artists[0].name;
//     let album = "ALBUM:   " + data.tracks.items[i].album.name;
//     let release = "RELEASE: " + data.tracks.items[i].album.release_date;
//     let preview = "PREVIEW: " + data.tracks.items[i].external_urls.spotify;

//     console.log(header);
//     console.log(track);
//     console.log(artist);
//     console.log(album);
//     console.log(release);
//     console.log(preview);
//     console.log("");

//     append_log(header);
//     append_log(track);
//     append_log(artist);
//     append_log(album);
//     append_log(release);
//     append_log(preview);
// }

// console.log("");
// setTimeout(start_liri, 4000);

// });
// }
// function append_log(appendText) {

// fs.appendFileSync("log.txt", appendText + "\n");

// }

    
 


                    // var songName = userInput.songName;
                    // //
                    // if (userInput.songName === "") {
                    //     songName = "Bohemian Rapsody"
                    // }
                    // //
                    // spotify.search({
                    //     type: 'track',
                    //     query: songName
                    // }, function (err, response) {
                    //     if (err) {
                    //         return console.log('Error occurred: ' + err);
                    //     }
                    //     // response data
                    //     for (var i = 0; i < response.tracks.items.length; i++) {
                    //         var artistName = response.tracks.items[i].artist[0].name;
                    //         var albumName = response.tracks.items[i].name;
                    //         var previewLink = response.tracks.items[i].preview_url;

                    //         console.log("*************************************************");
                    //         console.log("Artist:" + artistName);
                    //         console.log("Album:" + albumName);
                    //         console.log("Preview link: " + previewLink);
                    //         console.log("******************************************************");     
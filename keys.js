console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
exports.omdb = {
  id: process.env.OMDB_apikey    
};
exports.bandsInTown = {
  id: process.env.BANDSinTOWN_app_id    
};
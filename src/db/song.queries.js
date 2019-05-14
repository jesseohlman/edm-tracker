const Song = require("./models").Song;

module.exports = {
    addSong(req, callback){
        Song.create({
            name: req.body.name,
            artist: req.body.artist,
            genre: req.body.genre,
            sound: req.body.sound
        }).then((song) => {
            callback(null, song);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getSongs(genre, callback){
        Song.findAll({where: {genre: genre}})
        .then((songs) => {
            callback(null, songs);
        })
        .catch((err) => {
            callback(err);
        })
    },
     
    //ADD THIS TO THE TOP SONGS LIST WHEN PLAY COUNTING WORKS
    sortSongs(songs, callback){
        var playsArr = songs;

        playsArr.sort(function(a, b){
            return a.plays - b.plays;
        });

       callback(null, playsArr);

    },

    updateSong(req, callback){
        var currentSong = req.body.song;

        currentSong.Update({
            plays: req.body.play || currentSong.plays,
            favorites: req.body.favorite || currentSong.favorites
        }).then((song) => {
            callback(null, song);
        })
        .catch((err) => {
            callback(err);
        })

    }
}
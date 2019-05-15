const Song = require("./models").Song;
const Favorite = require("../db/models").Favorite;


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
        Song.findAll({ include: [{
            model: Favorite,
             as: "favorites",
            
            }],  where: {genre: genre}
        })
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
            return a.playCount - b.playCount;
        });

       callback(null, playsArr);

    },

    updateSong(req, callback){
        var currentSong = req.body.song;

        currentSong.Update({
            playCount: req.body.play || currentSong.playCount,
            favoriteCount: req.body.favorite || currentSong.favoriteCount
        }).then((song) => {
            callback(null, song);
        })
        .catch((err) => {
            callback(err);
        })

    }
}
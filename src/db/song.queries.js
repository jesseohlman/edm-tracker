const Song = require("./models").Song;
const Favorite = require("../db/models").Favorite;
const Authorizer = require("../policies/policy");


module.exports = {
    addSong(req, callback){
        const authorized = new Authorizer(req.user);

        if(authorized.create()){
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
    } else {
        callback("Unauthorized");
    }
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

    deleteSong(req, callback){
        const authorized = new Authorizer(req.user);

        if(authorized.delete()){
            Song.destroy({where: {id: req.params.id}})
            .then((song) => {
                callback(null, null);
            })
            .catch((err) => {
                callback(err);
            })
        } else {
            callback("Unauthorized");
        }
    },

    getSong(songId, callback){
        Song.findOne({where: {id: songId}})
        .then((song) => {
            callback(null, song);
        })
        .catch((err) => {
            callback(err);
        })
    },
     
    //ADD THIS TO THE TOP SONGS LIST WHEN PLAY COUNTING WORKS
    sortSongs(songs, callback){
        var playsArr = songs;

        playsArr.sort(function(a, b){
            return b.playCount - a.playCount;
        });

       callback(null, playsArr);

    },

    updatePlays(songId, callback){

        Song.findOne({where: {id: songId}})
        .then((song) => {

            var count = song.playCount + 1;
            song.update({
                playCount: count,
            }).then((song) => {
                callback(null, song);
            })
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        })

    },

    updateSong(req, callback){
        Song.findOne({where: {id: req.params.id}})
        .then((song) => {
            const authorized = new Authorizer(req.user, song);

            if(authorized.update()){
            var currentSong = song;
            song.update({
                name: req.body.name || currentSong.name,
                artist: req.body.artist || currentSong.artist,
                genre: req.body.genre || currentSong.genre,
                sound: req.body.sound || currentSong.sound,
                playCount: req.body.play || currentSong.playCount,
                favoriteCount: req.body.favorite || currentSong.favoriteCount
            }).then((song) => {
                callback(null, song);
            })
            .catch((err) => {
                callback(err);
            })
            } else {
                callback("Unauthorized");
            }
        })
    },

    getTop10(callback){
        Song.findAll({})
        .then((allSongs) => {
            var unsorted = allSongs;

            unsorted.sort(function(a, b){
                return b.playCount - a.playCount;
            });

            var sorted = unsorted.slice(0, 10);

            callback(null, sorted);
        })
        .catch((err) => {
            callback(err);
        })
    }

}
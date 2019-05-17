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
            return a.playCount - b.playCount;
        });

       callback(null, playsArr);

    },

    updateSongCounts(req, callback){
        var currentSong = req.body.song;

        req.body.song.Update({
            playCount: req.body.play || currentSong.playCount,
            favoriteCount: req.body.favorite || currentSong.favoriteCount
        }).then((song) => {
            callback(null, song);
        })
        .catch((err) => {
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
    }

}
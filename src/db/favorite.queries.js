const Favorite = require("../db/models").Favorite;
const Song = require("../db/models").Song;


module.exports = {
    createFavorite(req, callback){
        Favorite.create({
            userId: req.user.id,
            songId: req.body.songId
        }).then((favorite) => {
            callback(null, favorite);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        })
    },

    deleteFavorite(req, callback){
        Favorite.destroy({where: {songId: req.body.songId, userId: req.user.id}})
        .then((favorite) => {
            callback(null, null);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getFavSongs(req, callback){
        Favorite.findAll({where: {userId: req.user.id}})
        .then((favs) => {
            var favsIds = favs.map((fav) => {return fav.songId});

            Song.findAll({include: [{
                model: Favorite,
                 as: "favorites",
                
                }],  where: {id: favsIds}})
            .then((songs) => {
                if(songs){
                callback(null, songs);
                } else {
                    callback(null, null);
                }
            })
        })
        .catch((err) => {
            callback(err);
        })
    }
}
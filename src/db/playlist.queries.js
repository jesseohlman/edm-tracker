const Playlist = require("../db/models").Playlist;
const PlaylistItem = require("../db/models").PlaylistItem;
const Song = require("../db/models").Song;


module.exports = {

    createPlaylist(req, callback){
        Playlist.create({
            name: req.body.name,
            userId: req.user.id
        })
        .then((playlist) => {
            callback(null, playlist);
        })
        .catch((err) => {
            callback(err);
        })
    },
     getPlaylists(req, callback){
         Playlist.findAll({where: {userId: req.user.id}})
         .then((playlists) => {
             callback(null, playlists);
         })
         .catch((err) => {
             callback(err);
         })
     },

     addSong(req, callback){
        PlaylistItem.findOne({where: {
            playlistId: req.body.playlistId,
            songId: req.body.songId
        }})
        .then((playItem) => {

            if(!playItem){
            PlaylistItem.create({
                playlistId: req.body.playlistId,
                songId: req.body.songId
            })
            .then((playItem) => {
                callback(null, playItem);
            })
        } else {
            callback("That song is already on that playlist");
        }
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        })
     },

     getPlayWithSongs(playlistId, callback){
         Playlist.findOne({
             include: [{
                 model: Song,
                 as: "songs",
                 required: false,
                 attributes: ['id', 'sound', 'name', 'genre', 'artist'],
                 through: { attributes: []}
             }],
             where: {id: playlistId}
         })
         .then((playlist) => {
             callback(null, playlist);
         })
         .catch((err) => {
             callback(err);
         })
     },

     removeSong(req, callback){
         PlaylistItem.findOne({where: {songId: req.body.songId, playlistId: req.params.id}})
         .then((playItem) => {
             playItem.destroy({where: {id: playItem.id}})
             .then((playItem) => {
                callback(null, null);
             })
         })
         .catch((err) => {
             callback(err);
         })
     },

     deletePlaylist(req, callback){
         Playlist.destroy({where: {id: req.params.id}})
         .then((playlist) => {
             callback(null, null);
         })
         .catch((err) => {
             callback(err);
         })
     }
}